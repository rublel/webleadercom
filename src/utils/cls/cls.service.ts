import { getNamespace } from 'cls-hooked';
import { TRACE_STORAGE_CLIENTELING_APP } from 'src/common/middlewares/clsNamespace.constants';

export class ClsService {
  public static set(
    key: string,
    value: any,
    storageName: string = TRACE_STORAGE_CLIENTELING_APP,
  ) {
    const namespace = getNamespace(storageName);
    namespace.set(key, value);
  }

  public static get(
    key: string,
    storageName: string = TRACE_STORAGE_CLIENTELING_APP,
  ): any {
    const namespace = getNamespace(storageName);
    return namespace.get(key);
  }

  public static setValues(
    values: Record<string, unknown>,
    storageName: string = TRACE_STORAGE_CLIENTELING_APP,
  ) {
    for (const [key, value] of Object.entries(values)) {
      this.set(key, value, storageName);
    }
  }
}
