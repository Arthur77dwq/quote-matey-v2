# TOC

- [Introduction](#introduction)
- [Test case structure](#test-case-structure)
- [Test Case Design Framework](#test-case-design-framework)
- [Chat API](#chat-api)
- [Chat Page](#chat-page)

## Introduction

This document contains test cases, so that they should not get duplicated and we know what is tested/not tested.

## Test case structure

Each test case includes:

```text
ID: TC-<number>
Scenario: <describe test scenario>
Input: <Structure of input>
Expected: <Expected Output>
```

## Test Case Design Framework

1. **Happy Path (Core Functionality):** These are must have.
2. **Invalid Input:** Ask: What can go wrong from user side?
3. **Edge Cases:** Situations that are uncommon.
4. **Failure Handling:** Check whether failure is handled properly.
5. **Security (if relevant):** Test that malicious input doesn’t break behavior.

## Chat API

**_What does this system do_**

When `/api/chat` endpoint is called with required input.

- Extracts user messages.
- Fetchs api key from environment variables.
- Build prompt which contains user messages.
- Try different models.
  - Retry atleast twice if result is not generated for each model.
- Give result to user if available else provide enough information in feedback.

**_Scenarios_:**

**Core Functionalities:**

1. **TC-01:** Should extract user message.
2. **TC-02:** Should fetch api key from environment variables.
3. **TC-03:** Should build prompt which contains user message.
4. **TC-04:** Should call ai model to generate quote.
5. **TC-05:** Should provide response.

**Invalid Inputs:**

1. **TC-06:** Returns error if messages array is empty.
2. **TC-07:** Returns error if messages is undefined.
3. **TC-08:** Returns error if no user message present.
4. **TC-09:** Returns error if user message is empty.
5. **TC-10:** Handles null content safely.
6. **TC-11:** Handles non-string user content.
7. **TC-12:** Handles invalid messages type (not array).
8. **TC-13:** Handles very long input safely.

**Edge Cases:**

1. **TC-14:** uses the last user message
2. **TC-15:** falls back if AI returns empty string
3. **TC-16:** handles undefined AI response safely
4. **TC-17:** handles very large input
5. **TC-18:** handles special characters safely
6. **TC-19:** cleans markdown and emojis from output
7. **TC-20:** stops retry after max attempts
8. **TC-21:** ignores assistant/system messages

**Failure Handling:**

1. **TC-22:** retries on 429
2. **TC-23:** retries on 503
3. **TC-24:** retries on AbortError
4. **TC-25:** stops after max retries
5. **TC-26:** falls back to next model
6. **TC-27:** uses next model if response is empty
7. **TC-28:** returns fallback if all models fail
8. **TC-29:** does not retry on non-retryable error
9. **TC-30:** handles unexpected error gracefully

## Chat Page

```txt
Manual testing is enough for now.
```

**_What does this system do_**

When user interacts with the chat page:

- Accepts user input
- Prevents invalid submissions
- Sends request to /api/chat
- Shows loading state
- Displays assistant response
- Handles errors gracefully
- Prevents duplicate requests
- Maintains conversation history

**_Scenarios:_**

**Core Functionalities:**

1. **TC-01:** Should render input field and send button
2. **TC-02:** Should allow user to type message
3. **TC-03:** Should send message on button click
4. **TC-04:** Should display user message in chat
5. **TC-05:** Should call /api/chat with correct payload
6. **TC-06:** Should display assistant response
7. **TC-07:** Should clear input after sending message
8. **TC-08:** Should maintain message history (conversation flow)

**Invalid Inputs:**

1. **TC-09:** Should not send request if input is empty
2. **TC-10:** Should not send request if input contains only spaces
3. **TC-11:** Should handle null/undefined input safely
4. **TC-12:** Should trim input before sending
5. **TC-13:** Should prevent submission if already loading

**Edge Cases:**

1. **TC-14:** Should prevent duplicate submissions (double click)
2. **TC-15:** Should handle very long user input
3. **TC-16:** Should handle special characters in input
4. **TC-17:** Should handle empty response from API
5. **TC-18:** Should handle missing content in API response
6. **TC-19:** Should display fallback text if response is empty
7. **TC-20:** Should keep scroll at bottom on new message (if implemented)
8. **TC-21:** Should preserve previous messages when new message is added

**Failure Handling:**

1. **TC-22:** Should show network error message when fetch fails
2. **TC-23:** Should show error message for non-OK API response
3. **TC-24:** Should handle invalid JSON response gracefully
4. **TC-25:** Should show fallback message on unexpected error
5. **TC-26:** Should recover and allow retry after error
6. **TC-27:** Should stop loading state after error

**Loading & UX Behavior:**

1. **TC-28:** Should show loading indicator while waiting for response
2. **TC-29:** Should disable input/button during loading
3. **TC-30:** Should remove loading indicator after response
4. **TC-31:** Should not allow multiple requests during loading

**Integration Behavior (Frontend ↔ API):**

1. **TC-32:** Should send correct message structure to API
2. **TC-33:** Should handle API fallback message ("High demand")
3. **TC-34:** Should display API response exactly as returned
4. **TC-35:** Should handle delayed API response
