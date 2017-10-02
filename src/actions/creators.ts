import * as history from "connected-react-router";

import { Photo, Comment } from "@src/interfaces/data";
import { ActionType } from "@src/actions/types";
import { RootObject as EndpointReponse } from "@src/interfaces/endpoint";
import { createActionCreator } from "@src/actions/helpers";

// export const selectPhoto = createActionCreator((photo: Photo) => ({
//     type: ActionType.SELECT_PHOTO,
//     payload: photo,
// }));

export const fetchPhotos = createActionCreator((profileName: string) => async (dispatch, getState) => {
    const state = getState();
    if (state.photos.isFetching) {
        return;
    }

    dispatch({
        type: ActionType.PHOTOS_FETCH_STARTED,
    });

    let response: Response;
    try {
        response = await fetch(`https://igpi.ga/${profileName}/media`);
    } catch (error) {
        console.error("Data fetching failed!", error);
        return;
    }
    const data = await response.json() as EndpointReponse;
    const photos = data.items.map<Photo>(item => ({
        id: item.code,
        link: item.link,
        comments: item.comments.data.map<Comment>(comment => ({
            id: comment.id,
            username: comment.from.username,
            text: comment.text,
        })),
        images: {
            standard: item.images.standard_resolution.url,
            thumbnail: item.images.thumbnail.url,
        },
    }));

    dispatch({
        type: ActionType.PHOTOS_FETCHED,
        payload: {
            profileName,
            photos,
        },
    });
});

export const redirectToProfilePage = createActionCreator((profileName: string) => history.push(`/${profileName}`));
