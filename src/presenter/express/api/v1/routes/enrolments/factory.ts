import _pick from 'ramda/src/pick';
import Enrolment from '../../../../../../types/items/Enrolment';
import Config from '../../../../presenterFactory/Config';
import beforeCreateRules, {
  beforeCreateSchema,
} from '../../../../utils/schemas/enrolments/createItem';
import beforeReplaceRules, {
  beforeReplaceSchema,
} from '../../../../utils/schemas/enrolments/replaceItem';
import beforeUpdateRules, {
  beforeUpdateSchema,
} from '../../../../utils/schemas/enrolments/updateItem';
import baseFactory from '../utils/baseFactory';
import beforeCreateItem from './functions/beforeCreateItem';
import convertDocumentIntoItem from './functions/convertDocumentIntoItem';

const enrolmentsFactory = (config: Config) => {
  const enhancedConfig = {
    ...config,
    beforeCreateRules,
    beforeCreateSchema,
    beforeReplaceRules,
    beforeReplaceSchema,
    beforeUpdateRules,
    beforeUpdateSchema,
  };
  const router = baseFactory<Enrolment>({
    config: enhancedConfig,
    factoryConfig: {
      beforeCreateItem: beforeCreateItem(enhancedConfig),
      convertDocumentIntoItem: convertDocumentIntoItem(enhancedConfig),
    },
    service: config.service.enrolments,
  });

  return router;
};

export default enrolmentsFactory;
