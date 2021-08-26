import { QUERY_AUTORUN_KEY } from '../constants';
import { appActions } from '../index';

export function* persistAutorunSettings({
  payload,
}: ReturnType<typeof appActions.setQueryAutorun>) {
  const { autorun } = payload;
  try {
    localStorage.setItem(QUERY_AUTORUN_KEY, JSON.stringify({ autorun }));
  } catch (err) {
    console.error(err);
  }
}
