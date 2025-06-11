# Strapi CMS Integration

This implementation provides a complete integration with Strapi CMS following the existing API patterns in the project.

## Environment Variables

Add the following to your `.env` file:

```bash
# Strapi CMS API URL
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
```

## Architecture

The CMS integration follows the established patterns:

### 1. Client Layer (`src/api/client/cmsClient.ts`)

- Dedicated Axios instance for Strapi API calls
- Separate configuration from main API client

### 2. Service Layer (`src/api/services/CMSService.ts`)

- Singleton pattern following existing services
- Error handling with consistent response format
- Methods for fetching home page content

### 3. Hooks Layer (`src/api/hooks/CMSHooks.ts`)

- React Query hooks for data fetching
- Caching and stale time optimization for CMS content
- Query keys for proper cache management

### 4. Types (`src/api/types/CMSTypes.ts`)

- TypeScript types for Strapi API responses (already existed)
- Type safety for CMS content structure

### 5. Redux State Management (`src/store/cms/cms.slice.ts`)

- Redux slice for CMS content state
- Actions for loading, error handling, and content updates
- Integrated with existing Redux store

### 6. Data Loading (`src/components/common/CMSWrapper/index.tsx`)

- Component wrapper that fetches CMS data on app load
- Automatically populates Redux store with CMS content
- Handles loading states and errors

## Usage

The CMS data is automatically fetched when the app loads and stored in Redux. Components can access it using:

```tsx
import useAppSelector from "@/hooks/useSelector";

function MyComponent() {
  const { homePageContent, isLoading, error } = useAppSelector(
    (state) => state.cms
  );

  return <h1>{homePageContent?.scroll_and_lol_heading || "Default Title"}</h1>;
}
```

## Strapi Content Type

Ensure your Strapi instance has a content type called `home-page-contents` with the fields defined in `CMSTypes.ts`, including:

- `scroll_and_lol_heading` (Text)
- `pick_your_mood_text` (Text)
- `joke_box_heading` (Text)
- And other fields as needed

## Example Implementation

The `HomePageClient` component demonstrates the usage:

```tsx
const { homePageContent } = useAppSelector((state) => state.cms);

<Header
  title={homePageContent?.scroll_and_lol_heading || "Scroll and LOL"}
  // ... other props
/>;
```

This provides a fallback to hardcoded text when CMS content is not available, ensuring the app remains functional.
