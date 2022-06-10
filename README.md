# Incidents API

## How to run

```
yarn
yarn start
```

## Approach

- Used `node-cache` to cache API responses from external APIs
- Setup cron job inside the server that runs every hour.
  Inside the cron job it flushes the cache and gets data from the APIs and stores the new data to the cache.
  - When the server starts, it calls the `refreshData` function by default to get the initial cache.
- For merging data, created an array of incident types that includes `name` and `mappings` array. The `mappings` array is for field mapping from the original API response to the required output type.
- The controller only gets data from the cache and returns it, so until the initial cache is set, it will return empty array.

\* There are some IP addresses that are not linked to employee_id. For those IP addresses, the employee ID `0` was used.

## Enhancements

- Would replace the `node-cache` with `redis`
