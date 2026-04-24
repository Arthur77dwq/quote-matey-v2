# TOC

- [Introduction](#introduction)
- [Test case structure](#test-case-structure)
- [Test Case Design Framework](#test-case-design-framework)
- [Chat API](#chat-api)
  - [What does this system do](#what-does-this-system-do)

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

### What does this system do

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

**Security (if relevant):**
