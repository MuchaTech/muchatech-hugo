---
title: "Zero Trust Architecture"
date: 2026-01-19T14:22:14+02:00
image_webp: images/blog/tp-security-model-test.webp
image: images/blog/tp-security-model-test.jpg
author: Motape Oswald Langa
description: "Moving from stagnant, network-based parameters to focus on users, assets, and resources"
topic: "Zero Trust"
tags: ["computer-security","zero-trust","architecture","enterprise"]
toc: true
lastReviewed: null
cta_title: "Planning a Zero Trust rollout?"
cta_text: "Discuss your organization's identity, device, and access priorities with the MuchaTech team."
cta_label: "Talk through your next steps"
draft: false
---


## How Zero Trust Changes Perimeter-Based Security

Zero Trust Architecture (ZTA) is an approach to designing security controls, not a single product. [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final) describes an architecture that does not grant implicit trust based on a user's or device's network location or ownership. Access to an enterprise resource is authenticated and authorized before a session is established.

Traditional controls such as firewalls and VPNs can still be useful, but being connected to an internal network should not by itself grant access to every resource. This distinction matters as organizations use cloud services, support remote work, and manage both organization-owned and personal devices.

![Diagram of a perimeter-based network, with a firewall separating an internal network from external networks.](images/blog/perimeter-security-simple.webp)

## What Zero Trust Means

Zero Trust focuses security decisions on the resource being accessed rather than treating a network boundary as proof that a request is safe. [CISA's Zero Trust Maturity Model](https://www.cisa.gov/resources-tools/resources/zero-trust-maturity-model) describes the goal as making granular, least-privilege access decisions for each request.

In practice, an organization defines access policies using relevant information such as the user's identity, the device's security state, and the sensitivity of the resource. The policy should grant only the access needed for the task, and activity should be logged so that access decisions can be reviewed and improved.

Zero Trust does not mean removing every network control or assuming every employee is malicious. It means that network location alone is not enough to establish trust.

### Security Areas to Consider

CISA's maturity model organizes implementation across five pillars:

- **Identity**: Use strong authentication and manage who or what can access each resource.
- **Devices**: Understand device ownership and security state before granting access.
- **Networks**: Apply appropriate segmentation and protect communications.
- **Applications and workloads**: Secure access to the applications and services the organization operates.
- **Data**: Identify sensitive information and apply protections based on its classification and use.

CISA also identifies visibility and analytics, automation and orchestration, and governance as capabilities that support work across these pillars. Artificial intelligence may be used in some monitoring tools, but it is not a requirement for a Zero Trust architecture.

For example, when an employee requests access to a customer-management application from home, a policy can consider the employee's identity, authentication strength, device state, and the access required for their role. The request should not be approved solely because the employee is connected to a VPN.

## A Practical Zero Trust Implementation Plan

NIST SP 800-207 describes Zero Trust concepts, logical components, and example deployment models; it does not prescribe a universal five-step rollout. The following sequence is a practical way to plan an organization's work:

1. **Set objectives and scope.** Identify the business outcomes, systems, and risks the first phase should address.
2. **Map resources and access.** Inventory important data, applications, users, devices, and the flows between them. Identify owners and dependencies.
3. **Strengthen identity and device controls.** Use strong authentication, keep device inventories current, and define the device-security signals that access policies will use.
4. **Create resource-specific access policies.** Start with a critical application or workflow. Grant the minimum access needed, and retain network controls where they reduce risk.
5. **Monitor, test, and improve.** Review access logs and policy decisions, test for disruption to legitimate work, and expand in stages. Choose measures that fit the objective, such as coverage of managed devices or the time needed to revoke access.

Avoid switching on broad blocking policies before understanding dependencies and testing them with affected users. A pilot can reveal missing inventory, unclear ownership, and operational issues before changes affect more services.

## Potential Benefits and Trade-offs

Zero Trust can make access less dependent on network location, support more granular permissions, and improve visibility into access to protected resources. These outcomes depend on implementation quality and ongoing operations; adopting a product or framework alone does not guarantee them.

Implementation also takes planning. Legacy applications, incomplete asset inventories, fragmented identity systems, and poorly tested policies can create cost or disrupt work. Start with a well-scoped use case and account for these dependencies when estimating effort.

Google's [BeyondCorp](https://cloud.google.com/beyondcorp) is an example of a Zero Trust implementation designed to let employees access services from untrusted networks without relying on a traditional VPN. It is an example, not a universal deployment template; organizations should select controls that fit their own systems and risk requirements.

For further guidance, read [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final) and [CISA's Zero Trust Maturity Model](https://www.cisa.gov/resources-tools/resources/zero-trust-maturity-model). Use them as references when defining a staged plan for your organization's environment.

---