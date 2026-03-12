

---

# Form Handling Skill (Optimized)

**Name:** `form-handling`
**Description:** Implements all website forms using a serverless architecture based on Cloudflare Pages Functions, D1 database, and Resend email notifications. Invoke when building Contact, Quote, Inquiry, or Newsletter forms.

---

# Form Handling Skill

This skill provides a **fully serverless form system** for Astro websites deployed on **Cloudflare Pages**.

It ensures:

* reliable inquiry collection
* low-cost infrastructure
* secure form submission
* automatic email notifications

This is optimized for **B2B foreign trade websites**.

---

# 1 Architecture

```
Astro Form (Client)
        ↓
Cloudflare Pages Function (/functions/api/forms)
        ↓
Cloudflare D1 Database
        ↓
Resend Email Notification
        ↓
CRM / Sales follow-up
```

Characteristics:

* serverless
* globally distributed
* near-zero maintenance
* high reliability

---

# 2 Supported Form Types

The system supports common **B2B lead generation forms**.

| Form Type       | Use Case                   |
| --------------- | -------------------------- |
| Contact Form    | General inquiries          |
| Quote Form      | Product quotation requests |
| Product Inquiry | Product page leads         |
| Newsletter      | Email subscription         |
| File Upload     | Drawings / specifications  |

---

# 3 Astro Form Example

Typical form component used in pages like:

```
/contact
/product/*
/quote
```

Example:

```astro
<form id="contactForm" data-endpoint="/api/forms/contact" method="POST">

<label for="name">Full Name *</label>
<input type="text" id="name" name="name" required>

<label for="email">Email *</label>
<input type="email" id="email" name="email" required>

<label for="message">Message *</label>
<textarea id="message" name="message" required></textarea>

<button type="submit">Send Inquiry</button>

</form>
```

---

# 4 Client-Side Submission Logic

```javascript
const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const payload = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim()
  };

  const res = await fetch(form.dataset.endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const result = await res.json();

  if (result.success) {
    alert("Thank you. We will contact you soon.");
    form.reset();
  } else {
    alert("Submission failed. Please try again.");
  }

});
```

---

# 5 Cloudflare Pages Function

File location:

```
/functions/api/forms/contact.ts
```

Example:

```ts
import { Resend } from "resend";

export const onRequestPost = async (context) => {

  const { request, env } = context;
  const body = await request.json();

  if (!body.name || !body.email) {
    return new Response(JSON.stringify({ error: "Invalid data" }), { status: 400 });
  }

  await env.FORMS_DB.prepare(
    "INSERT INTO submissions (name,email,message,created_at) VALUES (?,?,?,?)"
  )
  .bind(
    body.name,
    body.email,
    body.message,
    new Date().toISOString()
  )
  .run();

  const resend = new Resend(env.RESEND_API_KEY);

  await resend.emails.send({
    from: "website@company.com",
    to: "sales@company.com",
    subject: "New Website Inquiry",
    html: `
      <p><strong>Name:</strong> ${body.name}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p><strong>Message:</strong> ${body.message}</p>
    `
  });

  return new Response(JSON.stringify({ success: true }));
};
```

---

# 6 D1 Database Schema

Example table:

```sql
CREATE TABLE submissions (

id INTEGER PRIMARY KEY AUTOINCREMENT,

name TEXT,
email TEXT,
message TEXT,

source TEXT,
page TEXT,

created_at TEXT

);
```

Optional additional fields:

| Field    | Purpose                   |
| -------- | ------------------------- |
| source   | traffic source            |
| page     | page where form submitted |
| product  | product inquiry           |
| file_url | R2 file upload            |

---

# 7 File Upload Support

Optional file upload for:

* CAD drawings
* RFQ documents
* product specifications

Flow:

```
Form Upload
      ↓
Cloudflare R2
      ↓
File URL stored in D1
```

Workers validates:

* file type
* file size
* virus risk

---

# 8 Anti-Spam Protection

Recommended protections:

1 Honeypot field

```
<input type="text" name="company" style="display:none">
```

2 Cloudflare Turnstile

3 Rate limiting in Function

4 Input sanitization

---

# 9 Multi-language Support

Forms support website languages.

Example:

```js
const labels = {

name: { en: "Full Name", zh: "姓名" },
email: { en: "Email", zh: "邮箱" },
message: { en: "Message", zh: "留言" }

}
```

Error messages and success messages are localized.

---

# 10 Email Notifications

Resend sends email notifications to sales.

Options:

| Feature            | Description                    |
| ------------------ | ------------------------------ |
| Admin notification | new inquiry                    |
| Auto reply         | optional customer confirmation |
| CRM webhook        | optional integration           |

Example auto reply:

```
Thank you for contacting us.
Our sales team will reply within 24 hours.
```

---

# 11 UX Optimization

Good UX improves conversion.

Recommended features:

* real-time validation
* loading state
* success message
* smooth error handling

Example:

```
Submitting...
✓ Inquiry sent
```

---

# 12 Integration With Communication System

Forms complement other communication channels:

| Channel      | Implementation          |
| ------------ | ----------------------- |
| Email        | Resend notifications    |
| WhatsApp     | floating widget         |
| Social media | footer / contact page   |
| Form         | structured lead capture |

This ensures **multi-channel communication coverage**.

---

# 13 Recommended Form Locations

For B2B websites:

| Page         | Form         |
| ------------ | ------------ |
| Contact      | contact form |
| Product page | inquiry form |
| Quote page   | RFQ form     |
| Blog         | newsletter   |

---

# 14 Summary

This skill enables a **modern serverless inquiry system**.

It provides:

* reliable lead capture
* database storage
* email notifications
* anti-spam protection
* multilingual support
* integration with the communication system

The system is optimized for **Astro + Cloudflare Pages architecture**.

---


