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

When `/chat` endpoint is called with required input.

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

**Edge Cases:**

**Failure Handling:**

**Security (if relevant):**
