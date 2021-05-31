// generic query function
export function queryAnilist(query, variables, accessToken) {
    return new Promise((resolve, reject) => {
        const url = 'https://graphql.anilist.co';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };
        if (accessToken) { // add to request
            options.headers.Authorization = 'Bearer ' + accessToken;
        }
        // make the API request
        fetch(url, options)
            .then(extractJson)
            .then((json) => resolve(json))
            .catch((error) => {
            console.error(error);
            reject(error);
        });
        function extractJson(response) {
            return response.json().then(function (json) {
                return response.ok ? json : Promise.reject(json);
            });
        }
    });
}
export function querySearchMedia(searchString) {
    return new Promise((resolve, reject) => {
        if (!searchString || searchString === '') {
            reject(new Error('invalid value for searchString'));
            return;
        }
        const query = `
      query ($search: String) {
        Media (search: $search, type: ANIME) {
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
    `;
        const variables = { search: searchString };
        queryAnilist(query, variables, null)
            .then((result) => resolve(result))
            .catch((error) => reject(error));
    });
}
export function queryUserMediaNotes(mediaId, userName) {
    return new Promise((resolve, reject) => {
        if (!Number.isInteger(mediaId) || !userName) {
            reject(new Error('invalid values for mediaId or userName'));
            return;
        }
        const query = `
      query ($mediaId: Int, $userName: String) {
        MediaList (mediaId: $mediaId, userName: $userName) {
          status
          progress
          score
        }
      }
    `;
        const variables = { mediaId: mediaId, userName: userName };
        queryAnilist(query, variables, null)
            .then((response) => resolve(response))
            .catch((errorResponse) => {
            if (errorResponse.data.MediaList === null) {
                resolve(null);
            }
            else {
                reject(errorResponse);
            }
        });
    });
}
export function updateUserMediaNotes(mediaId, progress, score, accessToken) {
    return new Promise((resolve, reject) => {
        if (isNaN(mediaId) || isNaN(progress) || isNaN(score) || !accessToken) {
            reject(new Error(`ERROR: invalid value for mediaId (${mediaId}), progress (${progress}),
              score (${score}), or accessToken (${accessToken})`));
            return;
        }
        const query = `
      mutation ($mediaId: Int, $progress: Int, $scoreRaw: Int) {
          SaveMediaListEntry (mediaId: $mediaId, progress: $progress, scoreRaw: $scoreRaw) {
              id
              progress
              score
          }
      }
    `;
        const variables = { mediaId: mediaId, progress: progress, scoreRaw: score };
        queryAnilist(query, variables, accessToken)
            .then((result) => resolve(result))
            .catch((error) => reject(error));
    });
}
export function queryUserData(accessToken) {
    return new Promise((resolve, reject) => {
        const query = `
      query {
        Viewer {
          id
          name
          siteUrl
        }
      }
    `;
        queryAnilist(query, null, accessToken)
            .then((response) => { resolve(response); })
            .catch((error) => reject(error));
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktYW5pbGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcXVlcnktYW5pbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVQSx5QkFBeUI7QUFDekIsTUFBTSxVQUFVLFlBQVksQ0FBQyxLQUFhLEVBQUUsU0FBYSxFQUFFLFdBQW1CO0lBQzVFLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDckMsTUFBTSxHQUFHLEdBQUcsNEJBQTRCLENBQUE7UUFDeEMsTUFBTSxPQUFPLEdBQXVCO1lBQ2xDLE1BQU0sRUFBRSxNQUFNO1lBQ2QsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSxrQkFBa0I7Z0JBQ2xDLE1BQU0sRUFBRSxrQkFBa0I7YUFDM0I7WUFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDbkIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osU0FBUyxFQUFFLFNBQVM7YUFDckIsQ0FBQztTQUNILENBQUE7UUFFRCxJQUFJLFdBQVcsRUFBRSxFQUFFLGlCQUFpQjtZQUNsQyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsR0FBRyxTQUFTLEdBQUcsV0FBVyxDQUFBO1NBQ3hEO1FBRUQsdUJBQXVCO1FBQ3ZCLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDO2FBQ2hCLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDakIsSUFBSSxDQUFDLENBQUMsSUFBUSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDakMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ3BCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNmLENBQUMsQ0FBQyxDQUFBO1FBRUosU0FBUyxXQUFXLENBQUMsUUFBa0I7WUFDckMsT0FBTyxRQUFRLENBQUMsSUFB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