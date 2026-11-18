-- ROSA customer reviews. Run in Supabase SQL Editor before deploying.
create table if not exists public.reviews (
 id uuid primary key default gen_random_uuid(),
 display_name text,
 email text not null,
 review text not null,
 rating integer not null check (rating between 1 and 5),
 status text not null default 'pending' check (status in ('pending','approved','rejected')),
 is_demo boolean not null default false,
 created_at timestamptz not null default now(),
 constraint reviews_email_format check (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$'),
 constraint reviews_text_length check (char_length(trim(review)) between 10 and 1200),
 constraint reviews_name_length check (display_name is null or char_length(display_name) <= 80)
);
alter table public.reviews enable row level security;
revoke all on table public.reviews from anon, authenticated;
grant select, update (status) on table public.reviews to authenticated;

drop policy if exists "Admins can read reviews" on public.reviews;
create policy "Admins can read reviews" on public.reviews for select to authenticated
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

drop policy if exists "Admins can moderate reviews" on public.reviews;
create policy "Admins can moderate reviews" on public.reviews for update to authenticated
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create or replace function public.submit_review(p_display_name text, p_email text, p_rating integer, p_review text)
returns void language plpgsql security definer set search_path = public as $$
begin
 if p_email is null or p_email !~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$' then raise exception 'A valid email address is required'; end if;
 if p_rating is null or p_rating < 1 or p_rating > 5 then raise exception 'Rating must be between 1 and 5'; end if;
 if p_review is null or char_length(trim(p_review)) < 10 or char_length(trim(p_review)) > 1200 then raise exception 'Review must be between 10 and 1200 characters'; end if;
 insert into public.reviews(display_name,email,rating,review,status,is_demo)
 values(nullif(trim(p_display_name),''),lower(trim(p_email)),p_rating,trim(p_review),'pending',false);
end;
$$;

create or replace function public.get_published_reviews()
returns table(id uuid, display_name text, review text, rating integer, created_at timestamptz)
language sql stable security definer set search_path = public as $$
 select r.id,r.display_name,r.review,r.rating,r.created_at
 from public.reviews r where r.status='approved' and r.is_demo=false
 order by r.created_at desc limit 8;
$$;

revoke all on function public.submit_review(text,text,integer,text) from public;
grant execute on function public.submit_review(text,text,integer,text) to anon,authenticated;
revoke all on function public.get_published_reviews() from public;
grant execute on function public.get_published_reviews() to anon,authenticated;

-- Clearly marked demo-only records. They remain excluded from the public reviews RPC.
insert into public.reviews(display_name,email,rating,review,status,is_demo)
select d.display_name,d.email,d.rating,d.review,'pending',true
from (values
 ('Demo Customer 01','demo01@example.invalid',5,'DEMO ONLY: The product presentation feels thoughtful and the shopping experience is easy to follow.'),
 ('Demo Customer 02','demo02@example.invalid',4,'DEMO ONLY: I like the clean design and clear product categories.'),
 ('Demo Customer 03','demo03@example.invalid',5,'DEMO ONLY: The overall store experience feels calm, polished, and simple to use.')
) as d(display_name,email,rating,review)
where not exists(select 1 from public.reviews r where r.is_demo=true and r.email=d.email);
