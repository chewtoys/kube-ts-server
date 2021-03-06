import sendResponse from '@js-items/express/dist/utils/sendResponse';
import { toSnake } from 'convert-keys';
import { OK } from 'http-status-codes';
import Config from '../../../../../presenterFactory/Config';
import catchErrors from '../../../../../utils/errors/catchErrors';

const describeApi = (config: Config) =>
  catchErrors(config, async (req, res) => {
    const { liveness, readiness, version } = config.appConfig.http.checks;

    const response = {
      availableRoutes: {
        auth: {
          login: '/api/v1/auth/login',
          register: '/api/v1/auth/register',
          remindPassword: '/api/v1/auth/remind-password',
          resendVerifyToken: '/api/v1/auth/resend-verify-token',
          resetPassword: '/api/v1/auth/reset-password',
          verifyAccount: '/api/v1/auth/verify-account',
        },
        autocomplete: '/api/v1/autocomplete',
        categories: '/api/v1/categories',
        checks: {
          liveness,
          readiness,
          version,
        },
        courses: '/api/v1/courses',
        discoveryItems: '/api/v1/discovery-items',
        enrolments: '/api/v1/enrolments',
        permissions: '/api/v1/permissions',
        roles: '/api/v1/roles',
        sections: '/api/v1/sections',
        users: '/api/v1/users',
      },
      docs: 'https://kubetsserver.docs.apiary.io',
      issues: 'https://github.com/kube-js/kube-ts-server/issues',
      repo: 'https://github.com/kube-js/kube-ts-server',
    };

    sendResponse({
      body: toSnake(response),
      req,
      res,
      status: OK,
    });
  });

export default describeApi;
