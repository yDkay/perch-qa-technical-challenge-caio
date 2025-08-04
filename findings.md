# Findings

_All tests run on macOS 15.5 • Chrome 125.0 • Node 18.0.0_  
**Severity**: Critical ▸ Major ▸ Minor ▸ Info

---

This project is structured in **two identical test suites**:

1. **Plain Cypress** – my preferred approach (simpler, faster feedback).
2. **Cucumber/Gherkin on Cypress** – provided because the challenge requires it.

Having both lets you the reviewer compare styles side‑by‑side.

## _Note:_ I tweaked a small piece of the **`/checkout/payment`** code to standardise error‑message handling while debugging the inconsistency mentioned below.

## Home Page (`/`)

- **Sorting misbehaves (199 price stays mid‑list)** — **Major**

  - **Steps:** Click sort ascending / descending
  - **Expected:** Full resort of product cards
  - **Actual:** Item with price 199 remains in centre
  - **Suggestion:** Re‑compute list after state update

- **Mobile layout breaks** — **Minor**
  - **Steps:** DevTools mobile view
  - **Expected:** Responsive grid
  - **Actual:** Cards overflow viewport
  - **Suggestion:** Same media‑query fixes as Cart

---

## Product Page (`/product/:id`)

- **“Classic White Sneakers” image is brown** — **Minor**

  - **Steps:** Open product 1
  - **Expected:** White shoes
  - **Actual:** Brown image shown
  - **Suggestion:** Replace asset

- **Quantity select tampering same as Cart** — **Critical**

  - **Steps:** DevTools change option value
  - **Expected:** Clamp 1‑5
  - **Actual:** NaN or huge total
  - **Suggestion:** Input validation

- **Mobile layout issues** — **Minor**
  - **Steps:** Mobile viewport
  - **Expected:** Responsive design
  - **Actual:** Overflow
  - **Suggestion:** Media queries

---

## Cart Page (`/cart`)

- **Quantity select tampering causes NaN / overflow** — **Critical**

  - **Steps:** In DevTools, change `<option value>` to `abc` or `999`
  - **Expected:** Value clamped (1‑5) and sanitised
  - **Actual:** Total shows `NaN` or huge price
  - **Suggestion:** Validate value on change and on backend

- **Poor mobile responsiveness** — **Minor**
  - **Steps:** View cart on iPhone XR in DevTools
  - **Expected:** Layout adapts; no overflow
  - **Actual:** Horizontal scroll, clipped text
  - **Suggestion:** Add media queries / flex‑wrap

---

## Address Page (`/checkout/address`)

- **Phone field accepts a variety of characters** — **Major**

  - **Steps:** Enter `+55‑(45)‑9‑9999‑9999` in _Phone_ field or
  - **Steps:** Enter `0123456789asdasdasdasd` in _Phone_ field or
  - **Steps:** Enter `123123123123çÇ!@().>;:` in _Phone_ field or
  - **Expected:** Only digits or properly formatted phone numbers should be allowed, non‑digits either blocked or counted toward length
  - **Actual:** Field validates as long as 10‑15 digits exist, extra characters are ignored
  - **Suggestion:** Strip non‑digits for storage but validate raw input or auto‑format visibly

- **City / State / Country reject diacritics & international letters** — **Major**

  - **Steps:** Type `São Paulo` or `México` in respective fields
  - **Expected:** Accept Unicode letters with accents/cedilla/tilde
  - **Actual:** Validation error
  - **Suggestion:** Expand regex to use Unicode letter class (`\p{L}`)

- **Street accepts an infinite amount of characters** — **Major**

  - **Steps:** Enter 300 char worth of characters in respective fields
  - **Expected:** Give an error: 'Street must be 5-XX (Not an infinite one) characters'
  - **Actual:** Allows this big string
  - **Suggestion:** Add maxlength validation

- **Email field blocks legal RFC 5322 specials** — **Major**

  - **Steps:** Submit `test+alias@example.com` or `first.last!tag@example.com`
  - **Expected:** Valid email accepted under RFC 5322
  - **Actual:** Rejected as invalid
  - **Suggestion:** Replace custom regex with robust email‑parser library

- **ZIP code overly strict (digits‑only, fixed length)** — **Major**

  - **Steps:** Enter `SW1A 1AA` or `75008‑123`
  - **Expected:** Accept global formats (letters, digits, space, hyphen) 3‑10 chars
  - **Actual:** Rejected
  - **Suggestion:** Allow `[A‑Z0-9\- ]{3,10}`

- **Page accessible without cart data** — **Critical**
  - **Steps:** Navigate directly to `/checkout/address` in new tab
  - **Expected:** Redirect to Cart or Home if cart empty
  - **Actual:** Address form loads with empty state
  - **Suggestion:** Add route guard verifying cart not empty

---

## Payment Page (`/checkout/payment`)

- **Card‑holder name blocks diacritics / hyphen** — **Major**

  - **Steps:** Type `José da‑Silva`
  - **Expected:** Accepted
  - **Actual:** Validation error
  - **Suggestion:** Allow `\p{L}[' -]` pattern

- **Error messages inconsistent across fields** — **Major**

  - **Steps:** Submit empty form; compare messages
  - **Expected:** Uniform copy and styling
  - **Actual:** Copy and positioning differ
  - **Suggestion:** Centralise error component

- **Page accessible directly without address step** — **Critical**

  - **Steps:** Navigate to `/checkout/payment` with empty flow
  - **Expected:** Redirect to Address
  - **Actual:** Payment form loads
  - **Suggestion:** Route guard check

- **Repeat purchase after back‑navigation creates empty order** — **Critical**

  - **Steps:** After success page, click back, edit data, pay again
  - **Expected:** Block duplicate or record order correctly
  - **Actual:** Profile shows blank order
  - **Suggestion:** Reset checkout context post‑success

- **Expiry date validation missing** — **Major**
  - **Steps:** Enter `01/23` in _Expiry Date_ field
  - **Expected:** Field reject dates in the past (month/year earlier than current)
  - **Actual:** Past date accepted and purchase proceeds
  - **Suggestion:** Add runtime check comparing MM/YY against current date before allowing submission

---

## Success Page (`/checkout/success`)

- **Page accessible directly via URL** — **Critical**
  - **Steps:** Open `/checkout/success` without order
  - **Expected:** Redirect or 404
  - **Actual:** Success page shows random number order
  - **Suggestion:** Route guard & 404 for invalid access

---

## Profile Page (`/profile`)

- **Total value ignores quantity multiplier** — **Critical**

  - **Steps:** Buy 2× same item, open Profile
  - **Expected:** Total = price × 2
  - **Actual:** Shows single‑item price
  - **Suggestion:** Fix calculation

- **Name & Email unlimited length / reject valid specials** — **Major**

  - **Steps:** Enter 300‑char name or email or a valid name like `João`
  - **Expected:** Max length (≤50) and specials accepted
  - **Actual:** Unlimited & specials rejected
  - **Suggestion:** Add maxlength and relaxed regex

- **Mobile layout issues** — **Minor**
  - **Steps:** Mobile view
  - **Expected:** Responsive
  - **Actual:** Scroll required
  - **Suggestion:** Layout tweaks

---

## Order History Page (`/profile#orders`)

- **Second purchase saved as blank row** — **Critical**

  - **Steps:** Finish purchase → Back → alter data → purchase again → open Orders
  - **Expected:** Second order with details
  - **Actual:** Empty order card rendered
  - **Suggestion:** Prevent duplicate flow; validate order object before save

---
