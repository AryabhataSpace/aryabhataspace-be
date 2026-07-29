# Aryabhata Space Backend Instructions

## Scope

These instructions apply to the NestJS backend.

The backend currently uses hardcoded JSON or in-memory data to support frontend development.

The future production persistence layer will use:

* PostgreSQL
* TypeORM
* Migrations

All current backend work must make that transition straightforward.

## Backend Stack

* NestJS
* TypeScript strict mode
* REST APIs
* Class Validator
* Class Transformer
* Swagger/OpenAPI
* JSON/in-memory repositories initially
* PostgreSQL later
* TypeORM later
* JWT authentication later
* Role-based access control later

Use versions already installed in the repository.

## Architectural Principles

Use clear layers:

```text
Controller
    ↓
Application service
    ↓
Repository interface
    ↓
Repository implementation
```

Responsibilities:

### Controller

* Route definitions
* Parameter extraction
* Authentication and authorization decorators
* Request DTOs
* Response status codes
* Delegation to services

### Service

* Business rules
* Publishing rules
* Page assembly
* Validation beyond basic DTO shape
* Permission-aware operations
* Coordination across repositories

### Repository

* Data persistence and retrieval
* In-memory implementation now
* TypeORM implementation later

Do not place major business logic in controllers.

Do not let services depend directly on hardcoded arrays.

## Current Data Strategy

Use realistic hardcoded JSON to unblock frontend development.

The dummy data should include:

* Stable IDs
* Unique slugs
* Draft and published statuses
* Enabled and disabled sections
* Section positions
* Created and updated timestamps
* SEO metadata
* Multiple page types
* Realistic nested section content

Dummy data must follow the same contracts expected from the future PostgreSQL implementation.

## Temporary Persistence Limitations

The JSON/in-memory repository may support temporary mutations for admin frontend development.

Make the limitation explicit:

* Changes exist only in process memory.
* Changes are lost when NestJS restarts.
* Changes may differ between multiple server instances.
* The implementation is not production-ready.

Do not write runtime admin changes into tracked TypeScript source files.

Do not promise persistence until PostgreSQL is implemented.

## Repository Interfaces

Every domain expected to move to PostgreSQL should use an interface or injection token.

Example domains:

* Pages
* Page sections
* Site settings
* Navigation
* Projects
* Membership applications
* Candidate profiles
* Media metadata

Conceptual structure:

```text
PageRepository
├── InMemoryPageRepository
└── TypeOrmPageRepository
```

Switching implementations should happen through NestJS dependency injection, not by rewriting services.

## CMS Domain Model

A CMS page should contain information such as:

```text
id
slug
title
pageType
status
seo
theme
sections
createdAt
updatedAt
publishedAt
```

A CMS section should contain information such as:

```text
id
type
position
enabled
variant
data
```

Use a controlled section-type list.

Do not accept arbitrary component types from an admin request.

Suggested section types:

```text
announcement
hero
marquee
introduction
statistics
vision
principles
eligibility
process
projects
testimonials
partners
faq
cta
contact
```

## Section Validation

Every section type must have a defined data contract.

Validate section-specific requirements.

Examples:

### Hero

* Title is required.
* Description length should be bounded.
* Buttons must contain valid labels and internal or approved external URLs.
* Image metadata must include meaningful alternative text when the image is informative.

### Statistics

* Items must be an array.
* Each item requires a label and value.
* Limit the number of items where necessary for layout stability.

### FAQ

* Each item requires a question and answer.
* Empty questions or answers are invalid.
* Limit excessively large payloads.

Do not treat `Record<string, unknown>` as sufficient validation at API boundaries.

It may be used as a persistence shape, but incoming section data must be narrowed and validated by section type.

## API Structure

Prefix routes with:

```text
/api/v1
```

### Public endpoints

Possible public endpoints:

```text
GET /api/v1/pages/:slug
GET /api/v1/navigation
GET /api/v1/site-settings
GET /api/v1/projects
GET /api/v1/projects/:slug
```

Public endpoints must return only public and published data.

Do not expose:

* Draft pages
* Internal notes
* Admin user information
* Audit records
* Unpublished media
* Disabled sections
* Sensitive candidate data

### Admin endpoints

Possible admin endpoints:

```text
GET    /api/v1/admin/pages
GET    /api/v1/admin/pages/:id
POST   /api/v1/admin/pages
PATCH  /api/v1/admin/pages/:id
DELETE /api/v1/admin/pages/:id

POST   /api/v1/admin/pages/:id/sections
PATCH  /api/v1/admin/pages/:id/sections/:sectionId
DELETE /api/v1/admin/pages/:id/sections/:sectionId
PATCH  /api/v1/admin/pages/:id/sections/reorder

POST   /api/v1/admin/pages/:id/publish
POST   /api/v1/admin/pages/:id/unpublish
```

Keep public and admin controllers separate.

## Response Contracts

Return stable response contracts.

Do not expose TypeORM entities directly when PostgreSQL is introduced.

Use response DTOs or mapping functions.

A public page response should:

* Include only enabled sections.
* Sort sections by position.
* Include published SEO metadata.
* Exclude internal audit fields unless needed.
* Return a predictable not-found response.

Maintain backward compatibility when changing contracts.

When a breaking change is unavoidable, introduce a new API version or coordinate the frontend update explicitly.

## DTO Rules

* Use DTO classes for request validation.
* Enable global validation.
* Whitelist recognized fields.
* Reject or strip unexpected fields according to established application policy.
* Transform route parameters where appropriate.
* Add clear validation messages.
* Do not use `any`.

Separate DTOs for:

* Create
* Update
* Reorder
* Publish
* Query filters
* Responses where useful

Avoid one oversized DTO that handles every possible operation.

## Publishing Rules

Public pages must only be available when their status is `published`.

Publishing should eventually:

* Validate the complete page.
* Validate all enabled sections.
* Ensure the slug is unique.
* Set `publishedAt`.
* Record the publishing user.
* Create a revision or audit entry.
* Prevent publishing invalid content.

During the JSON phase, implement the same business behavior where practical even if persistence is temporary.

## Slugs

* Normalize slugs consistently.
* Require uniqueness.
* Use lowercase URL-safe values.
* Avoid silently changing an existing public slug during unrelated edits.
* Consider redirect support before allowing published slugs to change in production.

## Reordering Sections

The server must validate reorder requests.

* All section IDs must belong to the page.
* Duplicate IDs are invalid.
* Unknown IDs are invalid.
* Persist a deterministic position.
* Prefer contiguous positions.
* Perform the operation transactionally when PostgreSQL is introduced.

Do not trust frontend-provided positions without validation.

## Security

Even during initial development:

* Validate all input.
* Do not expose arbitrary file paths.
* Do not execute content from CMS fields.
* Do not return unsanitized error objects.
* Do not log passwords, tokens, or sensitive candidate data.
* Do not hardcode secrets.
* Use environment variables.
* Update `.env.example`.
* Apply request-size limits where appropriate.
* Add rate limiting before public production launch.

When authentication is added:

* Protect all admin routes.
* Enforce permissions in the backend.
* Do not rely on Angular route guards for security.
* Use role and permission guards.
* Add audit logs for content and administrative changes.

Possible roles:

```text
candidate
mentor
organization
reviewer
content_editor
admin
super_admin
```

Use permissions for sensitive actions rather than spreading role-name comparisons throughout services.

## HTML and Rich Text

Do not allow arbitrary executable HTML.

For rich-text content:

* Use a restricted content format.
* Sanitize content before storage or rendering.
* Reject scripts, event handlers, iframes, and unsafe URLs.
* Prefer structured content over raw HTML wherever practical.

The CMS should remain a controlled page system, not an arbitrary code-execution platform.

## Media

Initially, dummy media URLs may refer to frontend assets or approved placeholder URLs.

Later:

* Store actual files in object storage.
* Store only metadata and storage keys in PostgreSQL.
* Validate MIME type and file size.
* Generate safe filenames or keys.
* Do not trust client-provided file extensions.
* Restrict admin uploads by permission.
* Track alternative text and media status.

Do not store large binary files directly in ordinary CMS JSON fields.

## Error Handling

Use consistent application errors.

Expected cases include:

* Page not found
* Slug already exists
* Unsupported section type
* Invalid section payload
* Section does not belong to page
* Page cannot be published
* Unauthorized operation
* Forbidden operation

Use correct HTTP status codes.

Do not return raw internal exceptions or stack traces to clients.

## Swagger

Keep Swagger documentation accurate.

Document:

* Public page endpoints
* Admin page endpoints
* DTO schemas
* Status values
* Section types
* Validation requirements
* Example responses
* Temporary in-memory behavior where useful

Do not let Swagger decorators become the only source of business validation.

## PostgreSQL and TypeORM Migration

When persistence is introduced, prefer tables such as:

```text
cms_pages
cms_page_sections
cms_page_versions
site_settings
navigation_menus
navigation_items
media_files
audit_logs
```

A possible `cms_pages` model includes:

```text
id
slug
title
page_type
status
seo_title
seo_description
seo_image
theme
created_by
updated_by
published_at
created_at
updated_at
```

A possible `cms_page_sections` model includes:

```text
id
page_id
section_type
variant
position
enabled
data JSONB
created_at
updated_at
```

Use `JSONB` for section-specific data when appropriate, while still validating the application-level structure.

## TypeORM Rules

When TypeORM is added:

* Use migrations.
* Keep `synchronize` disabled in production.
* Use transactions for multi-record operations.
* Add indexes for slugs, statuses, foreign keys, and common filters.
* Avoid N+1 queries.
* Use explicit relations.
* Avoid eager-loading large relation graphs by default.
* Map entities to API responses.
* Keep database naming consistent.
* Use UTC timestamps.

Do not modify production schemas manually when a migration is appropriate.

## Concurrency and Versions

When production editing is implemented, prevent one administrator from silently overwriting another administrator’s changes.

Preferred future approaches:

* Optimistic locking with a version field
* Updated-at comparison
* Explicit page revisions

Revision history should eventually store:

* Who changed the page
* When it changed
* What version was published
* Previous section data
* Publish and unpublish actions

## Logging

Log meaningful operational events:

* Failed publishing attempts
* Unexpected repository failures
* Admin content mutations
* Authentication failures
* Validation anomalies

Do not log entire sensitive request bodies.

Use structured logging where supported by the project.

## Backend Testing

Add or update tests for:

* Published-page retrieval
* Draft-page exclusion
* Disabled-section exclusion
* Section ordering
* Unknown slug handling
* Admin page updates
* Section validation
* Unsupported section types
* Reorder validation
* Publish and unpublish behavior
* Repository implementation contract

The in-memory and future TypeORM repositories should satisfy the same shared repository behavior tests where practical.

## Backend Definition of Done

A backend task is complete when:

* Controllers remain thin.
* Business logic is in services.
* Data access is behind repository abstractions.
* Request data is validated.
* Public responses exclude private and draft data.
* API contracts remain stable.
* Swagger is updated where applicable.
* Errors use appropriate status codes.
* Tests or verification have been completed.
* The implementation remains migratable from JSON to PostgreSQL.
