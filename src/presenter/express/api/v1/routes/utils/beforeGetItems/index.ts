import Config from '../../../../../presenterFactory/Config';
import getAuthenticatedUser from '../../../../../utils/auth/getAuthenticatedUser';
import transactionWrapper, {
  HookOptions,
} from '../../../../../utils/handlers/transactionWrapper';

const beforeGetItems = (config: Config) =>
  transactionWrapper({
    beforeHandler: async ({ req }: HookOptions) => {
      await getAuthenticatedUser({ req, config });
    },
    config,
  });

export default beforeGetItems;
