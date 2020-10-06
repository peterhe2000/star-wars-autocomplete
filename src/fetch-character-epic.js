import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';
import { map, mergeMap, tap } from 'rxjs/operators';
import { fetchCharacterFulfilled, FETCH_CHARACTERS } from './actions';

const ENDPOINT = 'http://star-wars-characters.glitch.me/api/search';

const fetchCharactersEpic = (action$, state) => {
  return action$.pipe(
    ofType(FETCH_CHARACTERS),
    mergeMap((action) => {
      ajax.getJSON(ENDPOINT + action.payload.searchTerm).pipe(
        tap((value) => console.log(value)),
        map((response) => fetchCharacterFulfilled(response.results)),
      );
    }),
  );
};

export default fetchCharactersEpic;
