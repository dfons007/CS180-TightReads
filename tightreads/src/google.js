const googleAPI_query = "https://www.googleapis.com/books/v1/volumes?q=";
const googleAPI_volume = "https://www.googleapis.com/books/v1/volumes/";
const googleAPI_key = "9ba33c1405766c09e70821e1ab6b426400a0940d";

export function getGoogleBook(id)
{
    return fetch(googleAPI_volume+id)
           .then(response => response.json());
}

export function getGoogleSearch(subject){
    return fetch(googleAPI_query+"subject:"+subject)
        .then(response => response.json());
}