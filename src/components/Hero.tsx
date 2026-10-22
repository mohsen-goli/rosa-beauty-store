import React from "react";

const Hero = () => {
  return (
    <section
      style={{
        display: "flex",
        alignItems: "stretch",
        justifyContent: "space-between",
        backgroundColor: "#F9F4F2",
        padding: "60px 80px",
        gap: "50px",
        maxWidth: "1400px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      {/* --- بخش متن (سمت چپ) --- */}
      <div
        style={{
          flex: "0 0 35%", // ۳۵ درصد عرض
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            letterSpacing: "2px",
            color: "#D19CA2",
            marginBottom: "15px",
            fontWeight: "600",
          }}
        >
          BEAUTY THAT EMPOWERS
        </span>
        <h1
          style={{
            fontSize: "48px",
            lineHeight: "1.1",
            color: "#1A1A1A",
            marginBottom: "20px",
            fontFamily: "serif",
            fontWeight: "normal",
          }}
        >
          Enhance Your
          <br />
          <em style={{ color: "#D19CA2", fontStyle: "italic" }}>
            Natural Glow
          </em>
        </h1>
        <p
          style={{
            color: "#666",
            lineHeight: "1.6",
            marginBottom: "35px",
            fontSize: "16px",
          }}
        >
          Discover premium beauty & skincare products crafted to bring out the
          best in you.
        </p>
        <div style={{ display: "flex", gap: "15px" }}>
          <a
            href="/shop"
            style={{
              padding: "14px 28px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "600",
              borderRadius: "4px",
              backgroundColor: "#1A1A1A",
              color: "#fff",
              border: "1px solid #1A1A1A",
            }}
          >
            SHOP NOW &rarr;
          </a>
          <a
            href="/collections"
            style={{
              padding: "14px 28px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "600",
              borderRadius: "4px",
              backgroundColor: "transparent",
              color: "#1A1A1A",
              border: "1px solid #1A1A1A",
            }}
          >
            EXPLORE COLLECTIONS
          </a>
        </div>
      </div>

      {/* --- بخش عکس (سمت راست) --- */}
      <div
        style={{
          flex: "0 0 65%", // ۶۵ درصد عرض (بزرگتر از متن)
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          borderRadius: "12px",
        }}
      >
        <img
          src="/Images/hero/hero-1.jpg" // 🔴 اسم عکس خودت رو اینجا بذار
          alt="Beauty Products"
          style={{
            width: "100%",
            height: "100%",
            maxHeight: "550px", // تنظیم ارتفاع عکس
            objectFit: "cover", // 🔴 پر کردن کامل کادر (بدون فضای خالی پایین)
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          }}
        />
      </div>
    </section>
  );
};

export default Hero;
