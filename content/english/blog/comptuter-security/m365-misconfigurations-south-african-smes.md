---
title: "5 Microsoft 365 Misconfigurations Exposing South African SMEs to Business Email Compromise"
date: 2026-11-20
draft: false
author: Motape Oswald Langa
description: "Business Email Compromise (BEC) remains one of the costliest cyber threats facing South African businesses. Here are five common Microsoft 365 configuration gaps—and how to close them."
image: images/blog/computer-security/m365-bec.jpg
image_webp: images/blog/computer-security/m365-bec.webp
categories: ["Cybersecurity Operations", "POPIA Compliance"]
tags: ["M365", "Email Security", "SME", "South Africa", "Zero Trust"]
topic: "Microsoft 365 Security"
toc: true
lastReviewed: null
---

Business Email Compromise (BEC) rarely requires sophisticated zero-day exploits. In most incidents we investigate across South African SMEs, attackers gain access through stolen credentials and quietly abuse native Microsoft 365 features to monitor invoices, intercept payments, and exfiltrate sensitive client data—triggering mandatory breach notifications under **POPIA Section 22**.

Below are the five most common Microsoft 365 misconfigurations we uncover during baseline security assessments—and how to remediate them.

## 1. Legacy Authentication Protocols Remain Enabled
Even when Multi-Factor Authentication (MFA) is enforced on modern sign-ins, legacy protocols like POP3, IMAP, SMTP AUTH, and ActiveSync bypass MFA prompts entirely. Attackers routinely use password-spraying tools against these legacy endpoints.

* **The Fix:** Disable legacy authentication across your tenant using Conditional Access policies (or Security Defaults for smaller tenants) and block basic authentication in Exchange Online.

## 2. Permissive User Consent for Third-Party OAuth Apps
By default, many M365 tenants allow standard users to grant third-party cloud applications read/write access to their mailboxes, OneDrive files, and contacts. Attackers exploit this via **illicit consent grants**—tricking an employee into clicking "Accept" on a rogue OAuth app rather than stealing their password.

* **The Fix:** Restrict user consent to verified publishers and low-impact permissions only, and require an **Admin Consent Workflow** for any app requesting `Mail.Read` or `Files.Read.All`.

## 3. Unmonitored External Auto-Forwarding Rules
Once an attacker compromises an executive or finance mailbox, their first move is often creating an inbox rule that silently forwards incoming invoices or statements containing keywords like *"EFT"*, *"banking details"*, or *"invoice"* to an external Gmail or ProtonMail address.

* **The Fix:** Block automatic external email forwarding globally in the Microsoft 365 Defender Anti-Spam outbound policy, and configure SIEM alerts whenever a new inbox forwarding rule is created.

## 4. Missing or Misconfigured DMARC Enforcement
Having an SPF record alone does not stop an attacker from spoofing your executive team's display name or exact domain in phishing emails sent to your clients and suppliers.

* **The Fix:** Publish a valid **DKIM** signature for your custom domain and move your **DMARC** policy from `p=none` to `p=quarantine` or `p=reject` once legitimate mail senders are verified.

## 5. Over-Privileged Global Administrator Accounts
Assigning permanent `Global Administrator` roles to daily-use accounts—or to third-party IT support vendors—means a single compromised workstation can result in full tenant takeover.

* **The Fix:** Limit Global Admins to fewer than five dedicated, cloud-only break-glass/admin accounts, use role-specific permissions (e.g., *Exchange Administrator*, *Security Reader*), and enforce Privileged Identity Management (PIM) where licensed.

---

### Check Your Tenant Posture at Zero Cost
Not sure whether your organization has exposed legacy protocols, missing DMARC enforcement, or leaked credentials on the dark web? 

At **MuchaTech**, our **Free R0/month baseline plan** includes an **M365-enabled office machine optimization**, a **business email breach assessment**, and a **privacy and anonymity status check** tailored for South African SMEs.

{{< button href="https://muchatech.com/#contact" target="_blank" >}}
Request Your Free M365 & Email Breach Assessment
{{< /button >}}