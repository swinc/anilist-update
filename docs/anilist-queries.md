Anilist GraphQL Queries

```
query {
  Media (search: "Dr. STONE: STONE WARS", type: ANIME) {
    id
    title {
      english
    }
    episodes
    coverImage {
      medium
    }
  }
}
```

```
query {
  MediaList (mediaId: 16498, userName: "FallenInterest") {
    progress
  }
}
```
