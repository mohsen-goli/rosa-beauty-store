$path = ".\src\i18n.ts"
$content = [System.IO.File]::ReadAllText((Resolve-Path $path))

$replacements = @{
'demoNotice:\s*"Demo checkout: no real payment will be processed\. Do not enter real card details\."' = 'demoNotice: "Your order will be recorded, but no online payment will be collected."'
'payment:\s*"Demo Payment"' = 'payment: "Payment"'
'paymentUnavailable:\s*"Online payment is not connected in this demo\."' = 'paymentUnavailable: "Online payment is not available yet. Your order will be saved as unpaid."'
'placeOrder:\s*"Place Demo Order"' = 'placeOrder: "Place Order"'
'secureNotice:\s*"Demo checkout only\. No payment is collected\."' = 'secureNotice: "Your order is recorded securely. Payment is not processed online."'
'description:\s*"Your demo order has been completed successfully\."' = 'description: "Your order has been received successfully."'
'note:\s*"This is a demonstration\. No real payment or order processing has taken place\."' = 'note: "Your order is currently unpaid. Online payment has not been processed."'
'description:\s*"سفارش آزمایشی شما با موفقیت ثبت شد\."' = 'description: "سفارش شما با موفقیت ثبت شد."'
'note:\s*"این یک نمایش آزمایشی است و هیچ پرداخت یا پردازش واقعی سفارش انجام نشده است\."' = 'note: "وضعیت پرداخت سفارش شما پرداخت‌نشده است. پرداخت آنلاین انجام نشده است."'
'placeOrder:\s*"ثبت سفارش آزمایشی"' = 'placeOrder: "ثبت سفارش"'
'secureNotice:\s*"فقط نسخه نمایشی؛ هیچ مبلغی دریافت نمی‌شود\."' = 'secureNotice: "سفارش شما با امنیت در سیستم ثبت می‌شود. پرداخت آنلاین انجام نمی‌شود."'
'demoNotice:\s*"این صفحه نمایشی است؛ هیچ پرداخت واقعی انجام نمی‌شود\. اطلاعات کارت بانکی واقعی وارد نکنید\."' = 'demoNotice: "سفارش شما ثبت می‌شود، اما در این مرحله پرداخت آنلاین انجام نمی‌شود."'
'payment:\s*"پرداخت نمایشی"' = 'payment: "پرداخت"'
'paymentUnavailable:\s*"در این نسخه آزمایشی، پرداخت آنلاین متصل نیست\."' = 'paymentUnavailable: "درگاه پرداخت آنلاین هنوز فعال نیست. سفارش شما با وضعیت پرداخت‌نشده ثبت خواهد شد."'
'placeOrder:\s*"تأكيد الطلب التجريبي"' = 'placeOrder: "تأكيد الطلب"'
'placeOrder:\s*"إتمام الطلب التجريبي"' = 'placeOrder: "تأكيد الطلب"'
'placeOrder:\s*"تأكيد الطلب"' = 'placeOrder: "تأكيد الطلب"'
'description:\s*"اكتمل طلبك التجريبي بنجاح\."' = 'description: "تم استلام طلبك بنجاح."'
'note:\s*"هذه نسخة توضيحية؛ لم تتم أي عملية دفع أو معالجة طلب حقيقية\."' = 'note: "حالة طلبك غير مدفوع. لم تتم معالجة أي دفعة عبر الإنترنت."'
}

foreach ($pattern in $replacements.Keys) {
  $content = [regex]::Replace($content, $pattern, $replacements[$pattern])
}

$content = [regex]::Replace(
  $content,
  '(?m)^\s*continue:\s*"Continue Shopping",',
  '        orderNumber: "Order number",' + "`r`n" + '        orderTotal: "Order total",' + "`r`n" + '        continue: "Continue Shopping",'
)

$content = [regex]::Replace(
  $content,
  '(?m)^\s*continue:\s*"ادامه خرید",',
  '        orderNumber: "شماره سفارش",' + "`r`n" + '        orderTotal: "مبلغ سفارش",' + "`r`n" + '        continue: "ادامه خرید",'
)

$content = [regex]::Replace(
  $content,
  '(?m)^\s*continue:\s*"متابعة التسوق",',
  '        orderNumber: "رقم الطلب",' + "`r`n" + '        orderTotal: "إجمالي الطلب",' + "`r`n" + '        continue: "متابعة التسوق",'
)

$englishError = '        orderError: "We couldn''t place your order. Please check product availability and try again.",' 
$persianError = '        orderError: "ثبت سفارش انجام نشد. موجودی محصولات را بررسی کنید و دوباره تلاش کنید.",'
$arabicError = '        orderError: "تعذر تسجيل طلبك. تحقق من توفر المنتجات وحاول مرة أخرى.",'

$content = [regex]::Replace($content, '(?m)^(\s*)secureNotice:', ('$1' + 'orderError: "We couldn''t place your order. Please check product availability and try again.",' + "`r`n" + '$1' + 'secureNotice:'), 1)
# Add localized error messages to the Persian and Arabic checkout sections.
$matches = [regex]::Matches($content, '(?m)^\s*checkoutPage:\s*\{')
if ($matches.Count -ge 2) {
  $index = $matches[1].Index
  $tail = $content.Substring($index)
  $tail = [regex]::Replace($tail, '(?m)^(\s*)secureNotice:', ('$1' + $persianError + "`r`n" + '$1' + 'secureNotice:'), 1)
  $content = $content.Substring(0, $index) + $tail
}
if ($matches.Count -ge 3) {
  $matches = [regex]::Matches($content, '(?m)^\s*checkoutPage:\s*\{')
  $index = $matches[2].Index
  $tail = $content.Substring($index)
  $tail = [regex]::Replace($tail, '(?m)^(\s*)secureNotice:', ('$1' + $arabicError + "`r`n" + '$1' + 'secureNotice:'), 1)
  $content = $content.Substring(0, $index) + $tail
}

[System.IO.File]::WriteAllText((Resolve-Path $path), $content, [System.Text.UTF8Encoding]::new($false))
Write-Host "Translation update finished."
