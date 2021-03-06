import _pick from 'ramda/src/pick';
import Permission from '../../../../../../types/items/Permission';
import Config from '../../../../presenterFactory/Config';
import beforeCreateRules, {
  beforeCreateSchema,
} from '../../../../utils/schemas/permissions/createItem';
import beforeReplaceRules, {
  beforeReplaceSchema,
} from '../../../../utils/schemas/permissions/replaceItem';
import beforeUpdateRules, {
  beforeUpdateSchema,
} from '../../../../utils/schemas/permissions/updateItem';
import baseFactory from '../utils/baseFactory';
import convertDocumentIntoItem from './functions/convertDocumentIntoItem';

const permissionsFactory = (config: Config) => {
  const enhancedConfig = {
    ...config,
    beforeCreateRules,
    beforeCreateSchema,
    beforeReplaceRules,
    beforeReplaceSchema,
    beforeUpdateRules,
    beforeUpdateSchema,
  };
  const router = baseFactory<Permission>({
    config: enhancedConfig,
    factoryConfig: {
      convertDocumentIntoItem: convertDocumentIntoItem(enhancedConfig),
    },
    service: config.service.permissions,
  });

  return router;
};

export default permissionsFactory;
