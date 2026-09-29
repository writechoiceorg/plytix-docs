# Style guide

> **How to use this file:** This is the single source of truth for writing standards across all documentation pages. It is shared between the Writer and Reviewer skills. Before using this skill on a new project:
> 1. Fill in all `[bracketed placeholders]`.
> 2. Review the "Project-specific overrides" section at the bottom and complete it.
> 3. Where two options are offered, pick one and delete the other.
>
> If a rule needs to change mid-project, update it here and note the change date. Do not create separate override files.
>
> Voice, tone, and most grammar/formatting rules below are sourced from `materials/project-references/Plytix Content Guidelines 2026 (1).pdf` (owner: Jessie Schnaible, last updated 2026-02-04). Where that source and the generic defaults disagreed, the Plytix guidelines took priority. Sections marked with a PDF reference cite the section number in that document.

---

## Introduction

The goal of this guide is to ensure all Plytix documentation is clear, accurate, and helpful. The content transforms complex technical information into guides that empower Plytix PIM and DAM users — product content, ecommerce, and catalog teams — to use the platform.

For API documentation specifically, the audience is more technical and distinct from the in-product UI audience above. Calibrate voice and depth to whichever of these personas the page is for (source: `materials/project-references/before-writing.md`, §1):

- **Technical Internal User / Automation Builder** — a technical person inside a Plytix customer account, comfortable with APIs but not always a professional developer. Automates repetitive tasks (bulk exports, scheduled reports, data quality checks). Needs conceptual clarity more than technical depth.
- **Integration Engineer** — employed by a Plytix customer (brand, retailer, or agency) to build and maintain the connection between Plytix and their ERP, ecommerce platform, or marketplace. A power user who needs the full data model, query capabilities, and sync patterns, but isn't a Plytix expert going in.
- **Partner Developer** — builds a third-party product that integrates with Plytix for multiple customers (e.g. a catalog-production plugin or an ERP connector). Needs deep understanding of read patterns, relationship resolution, and performance at scale, since documentation quality directly affects their ability to support their own product.
- **AI agents** (emerging) — tools like Cursor, Copilot, and Claude acting on a developer's behalf. This is why OpenAPI format and AI-readable descriptions are a hard requirement for API reference content, not a nice-to-have.

---

## Core principles

- **Clarity**: Use plain language and avoid jargon.
- **Accuracy**: All content must come from the provided source materials (transcripts, product documents, etc.). Do not invent features or make assumptions.
- **Consistency**: Use the same terms, formatting, and voice across all guides to build user trust.
- **Value first, no friction**: Make the helpful info easy to find, easy to skim, and ungated. Anticipate follow-up questions and answer them without detours. Put the "recipe" at the top instead of burying it under intros or detours. (PDF §4)

---

## Voice and tone

**Voice** is Plytix's consistent personality — it never changes. **Tone** is the emotional setting of the moment — it adapts to the situation. Whether a page is celebrating a win or walking someone through a tricky error, the voice stays the same; only the tone shifts to match what the reader needs right then. (PDF §2)

Plytix sounds like an experienced, friendly colleague: competent, relatable, and self-aware. Explain complex things without making the reader feel small. This applies across all page types — concept, how-to, reference, and tutorial alike.

### The four voice traits

| Trait | Guideline | Write | Don't write |
|---|---|---|---|
| **Casual** | Clear, plain language without jargon. Inviting, not condescending. Speak to "you." | "Plytix PIM helps you easily organize and manage your product information, so you can keep all your product details accurate and up-to-date in one place." | "Utilizing state-of-the-art PIM software solutions, enterprises can synergistically streamline the aggregation, synchronization, and dissemination of product-related data across multifaceted platforms…" |
| **Respectful** | Inclusive and kind. Avoid swear words. Never punch down at competitors — including spreadsheets. Educate instead of telling people what to do. | "Plytix PIM helps you maintain accurate product data, allowing you to focus on how you can grow your business even more." | "You need to get Plytix — it actually helps you get stuff done, unlike boring spreadsheets and pathetic PIM tools." |
| **Authentic** | Be honest and transparent. Avoid misleading language. Show humility. Use concrete proof over vague promises. No "100% error-free," "overnight," or "effortless" absolute claims. | "While PIM software won't fix every challenge, it can save significant time. Plytix helped save Leigh Country 99 hours per month in manual updates." | "PIM software will revolutionize your business overnight, providing 100% error-free data management and making all your processes completely effortless." |
| **Witty** | Add witty, dry comments (and emojis when appropriate). Never force a joke — if it doesn't flow, leave it out. Subtle and dry, not goofy or silly. **One "wink" per page, maximum.** | "Think of PIM software as the hero of your product data. Always there, always reliable, but no cape." | "PIM software is like a superhero with a cape, swooping in to save the day! Whooooosh! ⚡🚀" |

- **Inclusive**: Use gender-neutral pronouns (`they`, `their`). Avoid idioms and culture-specific metaphors that may not translate well.
- **Bridge, don't correct**: If a reader uses their own term for something Plytix names differently, bridge to the correct term instead of correcting bluntly. "You may know this as an export feed. In Plytix, it's a channel," not "That's not called an output, it's a channel." (PDF §3)

### Rules of engagement (PDF §4)

- **Conversational beats formal.** A helpful-colleague tone is easier to trust and act on. Use casual, practical language; question-style headings work well when it fits, followed by a direct answer. Don't write like a textbook or overly polished corporate copy.
- **Clarity beats cleverness.** If someone has to reread a sentence, it added friction. "Create a channel, then map your attributes," not "Give your product data a home base, then let it spread its wings."
- **Specifics beat superlatives.** Concrete actions and outcomes build credibility. "Sync product titles and prices to Shopify automatically," not "Unlock unlimited potential with effortless automation."
- **Answer first, then expand.** Lead with the concise answer, then add detail for readers who want it. "Yes. Go to Settings → Attributes → Add Attribute," not "It depends…" without ever answering.
- **Don't say "no." Lead with what we can do.** Keep momentum. Be honest about limits, but make progress the headline. "You can do Y today using Z, and here's how. (X isn't supported yet.)" — not "No, we don't support X."
  - Worked example specific to this project: channels (Shopify, BigCommerce, feed exports) have no API endpoints at all — they're configured entirely in the Plytix UI. Don't write "The API doesn't support channels." Bridge to what the reader can actually do: "Channels are set up in the Plytix UI. To manage channel-eligible products from the API, use Destinations instead — see [Destinations]." (Source: `materials/project-references/before-writing.md`, §3; see also `information-architecture.md`'s Notes.)

---

## Formatting and structure

### Headings

- Do not use bold for headings.
- Use sentence case (only capitalise the first word and proper nouns).
- Use imperative verbs where possible — they are scannable and action-oriented.
  - Correct: `## Create a webhook`
  - Incorrect: `## How to Create a Webhook`
  - Incorrect: `## **Create a webhook**`

### Page titles

- Use active, not passive, titles.
  - Don't use: "When a workflow gets stuck"
  - Use: "Handle stuck workflows"
- Keep titles to 60 characters or fewer.
- Feature and product names in titles are always capitalized exactly as listed in `glossary.md` (e.g. "Plytix PIM," "Brand Portals") — this is distinct from blog-post titles, which use AP title case; docs page titles stay sentence case per the rule above except for these proper nouns.

### Introductions

- Start every page with a short, un-bolded introduction that summarises the page's purpose.
- Do not bold any words in introduction sections.
- Do not teach theory in introductions — save that for concept pages.

### User interface elements

- Use bold for user interface elements, buttons, and navigation paths only.
- Example: Click the **Save** button to keep your changes.
- Example: Navigate to **Settings > Integrations**.

### In-page navigation

For long articles with a main H2 heading followed by many H3 subheadings, add a bulleted list of the H3 titles under the H2. This acts as an in-page table of contents. Only include this when there are more than four H3 subheadings.

### Tables

- Use tables instead of bulleted lists for comparison-type content.
- Always include a header row followed by a separator row (`|---|`).

### Lists (PDF §6)

- If any list item is a complete sentence, use proper punctuation and capitalization on **all** items in that list.
- If list items are not complete sentences, don't add end punctuation, but do capitalize the first word of each item.
- Don't mix the two styles within a single list.
- **Rule of three for examples**: keep example lists to about three items (e.g. "…industries like furniture, fashion, and sporting goods"). A long list of 10+ examples is overwhelming and harder to remember — trim to the most representative few, or move a full list to a reference table.

### Numbers (PDF §6)

- Always spell out a number that starts a sentence ("Ten features are included," not "10 features are included").
- Spell out zero through ten ("We found five errors," not "We found 5 errors").
- Use numerals for 11 and above ("We need 15 participants," not "We need fifteen participants").
- Place currency symbols before the number ("$100," not "100$").
- Write big numbers out in full in documentation ("one thousand users," not "1K users"). Abbreviated forms (1K, 150K) are for social media only.

### Images and diagrams (PDF §9)

- Format: SVG or PNG with transparent background.
- Prefer Mermaid diagrams for flows and architecture — they are diff-able and maintainable in a repository.
- **Every image needs alt text.** If it's important enough to include, it needs text; purely decorative shapes can use blank/decorative alt text.
- **Describe purpose, not appearance.** Alt text should convey what the image communicates, as if replacing it: "Plytix PIM dashboard showing successful sync," not "A screenshot of a computer screen with numbers."
- **Start with the subject.** No filler like "Image of…" or "Screenshot of…": "Shopify channel run status showing 452 products," not "Image of a Shopify channel run…"
- **Stay under ~125 characters.** Screen readers truncate longer alt text. If more explanation is needed, add a short caption instead of stuffing a paragraph into alt text.
- **Include key on-screen text** when it carries the meaning: "Error banner: 'SKU is required' on screen," not "Screenshot of an error message."
- **Describe actions**, not pixels: "Selecting 'Add channel' in Settings → Channels," not "Cursor on a menu."
- **Mention color only if it carries meaning**: "Green status badge: Synced successfully," not "Blue and green screen with lots of sections."
- **Buttons and icons**: describe the function, not the element type ("Download scorecard," not "Button").
- Alt text starts with a capital letter.
- **Filenames** (for saved screenshot/diagram assets): descriptive, kebab-case, and searchable — e.g. `plytix-pim-shopify-connector.png`, not `screenshot_v2_final.png`.
- **Contextual placement**: a screenshot sits directly under the step it illustrates, not several sections later.

### Quotation marks

- Use quotation marks only for exact values the user must type or enter word for word.
- Do not use quotation marks for UI labels or buttons — those are **bold**.
- Example: In the **Name** field, enter "revenue this month".
- Example: Set the condition to "status == complete".
- **Punctuation with quotation marks**: commas and periods go inside the closing quotation mark (American style). "…be fair," not "…be fair".

---

## How-to step formatting

**Decided 2026-09-10**: this project uses numbered list steps for all how-to procedures — action-focused API integration tasks suit this better than narrative/H3 steps.

- Use numbered lists for all procedures.
- Begin each step with a bold imperative verb: `1. **Create** your template`
- Add optional sub-steps, code snippets, or expected results indented below the step.
- Include at least one sentence of context before presenting a list of steps whenever possible.

---

## Code and samples

- Always include the language tag immediately after the opening code fence.
- Add a filename or title label when the file name is relevant to the user.
- Highlight specific lines when drawing attention to a change or key detail.

Example:

````md
```bash title="install.sh"
curl -sSfL https://cli.example.com | sh
```
````

---

## Links and callouts

- Use descriptive markdown links — avoid bare URLs in body text.
- Use callouts for extra tips, caveats, or links to related conceptual guides.

Available callout types:

| Type | When to use |
|---|---|
| `note` | Additional context that is helpful but not critical |
| `tip` | Optional shortcuts or best practices |
| `info` | Neutral, supplementary information |
| `warning` | Actions that may cause data loss or unexpected results |
| `danger` | Irreversible actions or serious consequences |

> Check `projectConvention.md` for the exact callout syntax used by this project's platform.

---

## Grammar and punctuation

- **American English**: use American spelling (color, specialization, centralized, analyzed). AP Style Guide is the primary style authority; Merriam-Webster is the spelling authority. (PDF §6)
- **Contractions are encouraged.** They fit the casual, friendly voice. "That's why we've made our technologies…" not "That is why we have made our technologies…" (PDF §6)
- **Ampersands**: avoid `&`; write out "and." "Manage and optimize your product content from one place," not "Manage & optimize…" (PDF §6)
- **Hyphens**: use to join compound words ("self-restraint"), to write out compound numbers ("twenty-one"), and in a compound modifier that comes *before* a noun ("dog-friendly hotel"). Do not hyphenate a compound modifier that comes *after* the noun the hotel is dog friendly, not "the hotel is dog-friendly."
- **Em dash (—)**: never use. Use a comma, colon, or parenthesis instead. "The main goal, to increase conversions, was met," not "The main goal—to increase conversions—was met."
- **En dash (–)**: never use. Use a hyphen for ranges instead. "pages 1-5," not "pages 1–5."
- **Punctuation inside parentheses**: punctuation goes outside the closing parenthesis unless the entire sentence is inside the parentheses. "At Plytix, we love animals (especially dogs)," not "...dogs.)"
- Use digits for numbers in technical contexts per the Numbers rules above ("3 retries," "5 minutes" — numerals apply at 11+; spell out 0-10).
- Use serial (Oxford) commas, always.
- Meticulous attention to grammar, spelling, and punctuation is required at all times.

---

## Plain language

Replace complex words with simpler alternatives:

| Use | Instead of |
|---|---|
| use | utilize / leverage |
| get | obtain |
| before | prior to |
| because | due to the fact that |
| if | in the event that |
| help | facilitate |

Define jargon on first use. A channel is where you send product data (like Shopify or Amazon), not "configure your channel mappings to optimize syndication." (PDF §5)

**Use metaphors carefully.** One simple, accurate analogy that matches the concept is fine; a clever metaphor that breaks under scrutiny just confuses readers. (PDF §5)

**Noun precision (the "anti-vague" rule).** Vague pronouns force rereads — repeat the noun to stay clear. "Once you create the Attribute, you can assign that Attribute to a Product," not "Once you create it, you can assign it to them." (PDF §5)

**Target reading level**: aim for 7th–8th grade (check with the Hemingway App). Use short sentences and short, common words. This is more inclusive for non-native English speakers and anyone skimming or reading on mobile, and it's easier to translate/localize. Prefer simple past/present/future tense; avoid complex or continuous tenses when possible. (PDF §5)

---

## Words and phrases to avoid

Avoid the following in all documentation:

- `important`
- `very`
- `easily` / `easy`
- `quick` / `quickly`
- `simply` / `just` / `obviously`
- `with confidence`
- `things` (as in "handle things") — be specific instead
- `leverage` — use "use" or "using"

**AI-generated / hype words to avoid:**
- `delve`
- `seamless` / `seamlessly`
- `robust`
- `building blocks`
- `unlock`
- `cutting-edge`
- `revolutionize`
- `synergize` / `synergistically`
- `paradigm shift`
- `next-gen`

**Absolute claims to avoid** (conflicts with the Authentic voice trait — PDF §2): "100% error-free," "effortless," "overnight," "unlocks unlimited potential." Use concrete, provable outcomes instead.

---

## SEO and metadata

| Field | Rule |
|---|---|
| `title` | 60 characters or fewer. Start with the task or concept. Avoid duplicating titles across the same section. |
| `description` | One concise sentence, 120–155 characters. Begin with an action verb: "Learn how to…" or "Reference for…". |
| URL | Comes from the file name (Fumadocs has no `slug` field). Lowercase, hyphenated, no special characters, per `projectConvention.md`'s file naming rules. |

> **Updated 2026-09-29:** `keywords` and `slug` rows removed. Fumadocs strips frontmatter fields it doesn't define, so neither would reach the page. Put search terms in headings and the first paragraph instead.

### Answer-engine formatting (AEO)

Docs should be written to be the best answer that gets quoted by answer engines, not just indexed by search. (PDF §8)

- **TL;DR block**: for longer pages, add 3-5 factual bullets immediately under the H1 summarizing the key takeaways.
- **Answer-first H2s**: the first one to two sentences under every H2 must answer the question directly before adding context or nuance.
- **Binary language over "it depends"**: where there's a genuine either/or choice, state it plainly. "For a Shopify integration, use Plytix Feed Management. For Amazon-only selling, use Channels directly," not an unresolved "it depends."

---

## Missing information

If information is missing from the source material and clarification is needed, add a note explicitly in the draft.

Format: `[Note: Need clarification on [specific topic or parameter].]`

---

## "Related articles" section

When a guide needs a "Related articles" section, follow this content pattern:

- Open with one sentence: "Now that you know how to [complete the main task of this guide], you can explore these related guides."
- One card per related guide, each with a single sentence describing what the user will learn.
- **Use exactly 2 cards** (decided 2026-09-29). Two cards fill the row evenly and read better than three. Pick the two most closely related pages, and drop generic entry points such as the Quickstart unless the page has no closer match.

> This applies to "Related articles" and "Related resources" sections only. Landing and section-index pages (`index.mdx`) use `Cards` as primary navigation and are not capped.

Use the exact `Cards`/`Card` tag syntax and icon import pattern defined in `projectConvention.md`'s Components table — do not redefine the syntax here.

---

## Project-specific overrides

> These rules take priority over the defaults above when there is a conflict. Sourced from `materials/project-references/Plytix Content Guidelines 2026 (1).pdf`.

### Protected terminology

| Term | Notes |
|---|---|
| `Plytix` | The platform name. Never substitute "the system" or "the PIM" in customer-facing content. |
| `Plytix PIM`, `Plytix DAM`, `Plytix Feed Management`, `Plytix Brand Portals`, `Plytix Product Data Sheets`, `Plytix Shopify Content Manager`, `Plytix AI` | Official product names — see `glossary.md`. Always spelled out in full; never abbreviated. |
| `Channel` | Never "Export" or "Feed." Bridge to this term rather than correcting a reader who uses a different one. |
| `Brand Portal` | Never "eCatalog." |

### Bolding exceptions

- Do not bold words in introduction sections (already the default above).
- Bold UI labels exactly as they appear on screen, not paraphrased.

### Tone adjustments

- The full voice (Casual, Respectful, Authentic, **and Witty**) applies to every page type — concept, how-to, reference, and tutorial — not just intros. Cap wit at one "wink" per page, and only where it flows naturally; never force a joke into a procedural step.
- Bridge customer terminology to Plytix's own terms instead of correcting bluntly (see Voice and tone above).
- Never punch down at competitors, including spreadsheets or other PIM tools.

### Words and phrases to avoid (project-specific)

- Swear words — respectful tone, no exceptions, even in casual asides.
- Vague platform references — "the system," "the tool," "the PIM" — use "Plytix" or the specific product name instead.

### Heading convention

- Docs headings (H1-H3) stay sentence case per the Headings rule above. AP title case is reserved for blog post titles only and does not apply to this skill's output.

### Additional rules

- Rule of three: cap example lists at roughly three items; move longer lists to a reference table instead.
- Quality control: important customer-facing pages should get a native-English-speaker language pass before publishing, per the PDF's quality-control guidance.
