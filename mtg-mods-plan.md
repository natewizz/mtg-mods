# mtg-mods Website Development Plan

## 1. Discovery & Requirements

1. **Goals & Success Criteria**  
   - Enable users to browse, submit, upvote, bookmark, and “I tried this” recipes.  
   - Seed initial content as the site owner.  
   - Drive engagement via community features (votes, bookmarks, comments).

2. **Core Features**  
   - **Authentication & Profiles**: Sign up / log in (email, OAuth), profile page with submitted recipes, bookmarks, tried list.  
   - **Recipe CRUD**: Users can create, read, update (their own), and delete (their own) recipes.  
   - **Public Feed & Search**: Browse all recipes; filter/sort by newest, most upvoted, most tried, keyword.  
   - **Interactions**: Upvote/downvote toggle; “Save to Bookmarks”; “I Tried This” toggle; comments (optional MVP).  
   - **Owner Privileges**: Owner can seed/edit any recipe; promote or feature recipes.

3. **Non-Functional Requirements**  
   - **Performance**: Page loads under 2 s, fast sorting & filtering.  
   - **Scalability**: Handle growing user base and recipe count.  
   - **Security**: Protect user data, sanitize inputs, enforce authorization.  
   - **Accessibility & SEO**: Semantic markup, mobile-friendly, basic metadata for sharing.

## 2. Information Architecture

1. **Site Map**  
   ```
   /           → Home / Feed
   /recipes    → All recipes (with filters)
   /recipes/:id→ Recipe detail
   /submit     → Recipe submission form
   /login      → Sign in / Sign up
   /profile    → User dashboard (submissions, bookmarks, tried)
   /admin      → Owner moderation / seed recipes
   ```

2. **User Flows**  
   - **Guest → Browse**: Visit home → view recipe list → click detail → upvote (→ prompt to log in).  
   - **User → Submit**: Log in → go to Submit → fill form → publish → redirected to new recipe detail.  
   - **User → Bookmark**: On recipe detail, click “Save”; appears under Profile → Bookmarks.  

3. **Wireframes**  
   - **Home / Feed**: Vertical list of cards (name, summary, votes, tried count).  
   - **Recipe Detail**: Title, author, date, full instructions, interaction buttons (▲▼, Save, Tried).  
   - **Submit Form**: Fields for Name, Description, Step-by-step, Tags/Keywords, “Publish” button.  
   - **Profile Dashboard**: Tabs for “My Recipes”, “Bookmarks”, “Tried”.

## 3. Data Modeling & API Design

| Entity      | Key Fields                                                                         |
| ----------- | ---------------------------------------------------------------------------------- |
| **User**    | id, username, email, hashed_password, avatar_url, created_at                       |
| **Recipe**  | id, author_id → User, name, description, instructions (rich text), tags, created_at |
| **Vote**    | id, user_id, recipe_id, value (±1), created_at                                     |
| **Bookmark**| id, user_id, recipe_id, created_at                                                |
| **Tried**   | id, user_id, recipe_id, created_at                                                |

- **REST-style Endpoints** (or GraphQL):  
  - `GET /recipes` (with query params: sort, filter, page)  
  - `POST /recipes`, `PUT /recipes/:id`, `DELETE /recipes/:id`  
  - `POST /recipes/:id/vote`, `DELETE /recipes/:id/vote`  
  - `POST /recipes/:id/bookmark`, `DELETE /recipes/:id/bookmark`  
  - `POST /recipes/:id/tried`, `DELETE /recipes/:id/tried`  
  - `GET /users/:id/recipes|bookmarks|tried`

## 4. Technical Architecture

1. **Front-end**  
   - Static-site or SPA: renders lists, forms, handles interactions; fetches data via API.  
   - Responsive layout: mobile, tablet, desktop.

2. **Back-end**  
   - Microservice or monolith: exposes authentication, recipe, and interaction APIs.  
   - Business logic: enforce “one vote per user per recipe,” ownership checks.

3. **Data Storage**  
   - **Relational DB** (e.g., PostgreSQL) for structured data and relationships.  
   - **Optional**: NoSQL (e.g., DynamoDB) for scalability, if heavy caching/throughput needed.

4. **Hosting & Deployment**  
   - **Front-end**: CDN‐backed static hosting or containerized SPA.  
   - **Back-end**: Serverless functions or managed container service.  
   - **CI/CD**: Automated builds, tests, and deployments on push/merge.

5. **Auxiliary Services**  
   - **Auth**: OAuth provider or managed auth.  
   - **Notifications**: Email confirmations, password resets.  
   - **Analytics & Monitoring**: Track visits, errors, performance.

## 5. Visual & Interaction Design

1. **Design System**  
   - **Typography**: Clear, legible headings and body fonts.  
   - **Color Palette**: MTG-inspired accent colors; accessible contrast.  
   - **Components**: Cards, buttons, forms, navbars, badges for votes/tried counts.

2. **High-Fidelity Mockups**  
   - Homepage, recipe page, submission form, profile pages—all in your preferred design tool.

3. **Interaction Patterns**  
   - Optimistic UI updates on votes/bookmarks/tried toggles.  
   - Inline validation on forms.  
   - Confirmation modals for deletes.

## 6. Development & Testing

1. **Setup**  
   - Initialize repo(s), scaffold front-end and back-end.  
   - Configure linting, formatting, pre-commit hooks.

2. **Implementation Phases**  
   1. **Auth & User Profiles**  
   2. **Recipe CRUD & Detail View**  
   3. **Interactions (vote, bookmark, tried)**  
   4. **Search/Filtering & Pagination**  
   5. **Owner Seed Data & Admin Panel**

3. **Testing**  
   - **Unit Tests** for API endpoints and utilities.  
   - **Integration Tests** for end-to-end flows (e.g., submit → view → vote).  
   - **UI Tests** for critical pages.

4. **QA**  
   - Cross-browser/device checks.  
   - Performance profiling.  
   - Accessibility audit.

## 7. Deployment & Launch

1. **Prepare Production Environment**  
   - Secure environment variables.  
   - Configure domain DNS and SSL.

2. **Staging & Smoke Tests**  
   - Deploy to staging; run smoke tests on core flows.

3. **Go Live**  
   - Deploy to production; monitor traffic, errors, performance.

4. **Launch Checklist**  
   - Seed initial recipes.  
   - Verify owner can moderate.  
   - Announce via social channels or community forums.

## 8. Post-Launch & Maintenance

1. **User Feedback & Iteration**  
   - Collect feedback.  
   - Prioritize feature roadmap.

2. **Content Moderation**  
   - Tools for reporting inappropriate recipes.  
   - Owner/admin moderation UI.

3. **Performance & Security**  
   - Regular dependency updates.  
   - DB backups and security audits.

4. **Community & Growth**  
   - Spotlight weekly top recipes.  
   - Integrate sharing.

## Tags Taxonomy

- **Mechanics & Effects**:  
  `dice`, `draw`, `discard`, `scry`, `mill`, `tokens`, `counters`, `life-gain`, `damage`, `buff`, `debuff`, `copy`, `exile`, `tutor`

- **Timing & Triggers**:  
  `upkeep`, `draw-step`, `combat`, `end-step`, `enters-battlefield`, `dies`

- **Card Type Focus**:  
  `creature`, `instant`, `sorcery`, `artifact`, `enchantment`, `land`

- **Format & Play-style**:  
  `commander`, `standard`, `pauper`, `multiplayer`, `1v1`, `draft`, `singleton`

- **Strategy & Theme**:  
  `aggro`, `control`, `combo`, `political`, `group-decision`, `chaos`, `tribal`, `budget-friendly`

- **Complexity & Accessibility**:  
  `beginner`, `intermediate`, `advanced`, `quick-play`, `in-depth`

- **Social & Tracking**:  
  `popular`, `bookmarked`, `tried`, `featured`
