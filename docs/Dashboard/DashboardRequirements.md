# QuoteMatey Dashboard - Requirements

## 1. Purpose

To provide user a shell containing every action user needed at one place.

## 2. Users

1. Registered Users
2. Admin(if required)

## Chat Page

**_User: I want to create a new quote_**

> **_FR-01:_** _The system shall allow authentiated user to create new quotes by chat, voice, video, image._

**_Acceptance Criteria:_**

- As new user visits on chat page, The user should see new blank chat interface.
- A regular user visits chat page must see new blank chat interface with some most recent chats (If there's any).
- Every new chat must have a chat id(job id) consisting (initials of username-mm-yy-number).
- System must persist communication between user and system's ai service.
- User will provide job description to create quote. if enough information is not given by user ai must ask from user to provide.
- While ai is preparing quote it must show user what exectly ai is doing. (analyzing requirements, detecting job type, estimating labour, calculating material, estimating cost, etc).
- As soon as ai service provides quote it should toggle Preview and render there.
- Allow user to edit provided quote manually from preview viewer or by using ai.
- ai should not overwrite any changes done by user manully until said so.
- ai must segregate job details, additional attachments and show them in dedicated panel.
- system must maintain history of changes in quote and any state can be recovered in future.
- system must provide way to export quote in pdf.
- system must allow user to copy quote.
- system must maintain state of quote (draft, sent, approved, accepted.)
- system must provide action like: delete quote, delete chat, and other important actions.
- system must provide to regenerate quote if user is not satisfied.
- system must provide shareable link of quote.
