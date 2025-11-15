# Security Policy

## Supported Versions

Security fixes are provided for the latest stable versions of Markdrop:

| Version   | Support Status        |
| --------- | --------------------- |
| **0.2.x** | ✔ Actively supported  |
| **< 0.2** | ❌ No longer supported |

We strongly recommend using the newest version to receive security updates.


## Reporting a Vulnerability

We take security seriously and appreciate responsible disclosure.


> [!WARNING]
> **Please do NOT report vulnerabilities in public GitHub issues.**

### How to Report

If you believe you've found a security issue, please report it privately via:

1. **Email:** `dev.markdrop@proton.me`
2. **GitHub Security Advisory:**
   Use the private reporting feature here:
   **[Report a vulnerability](../../security/advisories/new)**

### What to Include

To help us verify and fix the issue promptly, please provide (when possible):

* A clear description of the vulnerability
* Steps to reproduce
* Affected files, code paths, or commit references
* Impact and severity assessment
* Proof of concept (if available)

We appreciate detailed reports, but even partial information is useful.

## Expected Response Timeline (Realistic)

We aim to:

* **Acknowledge your report within 72 hours**
* **Provide an initial assessment within 7–10 days**
* **Release a fix as soon as it is verified and tested**

Delays may occur depending on complexity, severity, or contributor availability.

## Disclosure Policy

* Please allow us adequate time to fix the issue before public disclosure.
* We will credit security researchers **unless anonymity is requested**.
* After a fix is released, a GitHub Security Advisory will be published.

## Security Considerations

### Markdown Rendering

* Markdrop uses HTML-enabled markdown processing (Remark / Rehype).
* Potential XSS vectors are sanitized, but **users should avoid rendering untrusted markdown without additional validation**.

### File Handling

* All file processing happens **client-side**.
* Markdrop does not store uploaded files on any backend.
* Users should validate and trust the content they upload or share.

### Third-Party Libraries

* Markdrop relies on multiple open-source libraries.
* We update dependencies regularly but cannot guarantee zero vulnerabilities in all upstream packages.
* Running `npm audit` or similar tools is encouraged for deployments.

## Security Best Practices for Users

If you self-host or extend Markdrop:

1. Keep your deployment updated.
2. Sanitize any markdown generated or imported from untrusted sources.
3. Serve the app over **HTTPS**.
4. Apply restrictive **Content Security Policy (CSP)** headers.
5. Review permissions and API keys if using Supabase or other integrations.

## Security Updates

Security fixes and announcements will be shared through:

* GitHub Security Advisories
* Release notes
* Changelog entries

## Contact

For any security-related concerns, please reach out privately via the contact methods above.

---

<p align="center">
  <sub><strong>Thank you for helping keep Markdrop secure for everyone!</strong></sub>
</p>