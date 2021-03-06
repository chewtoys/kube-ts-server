import { Router } from 'express';
import {
  AUTH,
  AUTOCOMPLETE,
  CATEGORIES,
  COURSES,
  DISCOVERY_ITEMS,
  ENROLMENTS,
  // UNITS
  PERMISSIONS,
  ROLES,
  ROOT,
  SECTIONS,
  USERS,
} from '../../../../constants/routes';
import Config from '../../presenterFactory/Config';
import authFactory from './routes/auth/factory';
import autocompleteHandler from './routes/autocompleteHandler';
import categoriesFactory from './routes/categories/factory';
import coursesFactory from './routes/courses/factory';
import enrolmentsFactory from './routes/enrolments/factory';
import getDiscoveryItems from './routes/getDiscoveryItems';
import permissionsFactory from './routes/permissions/factory';
import rolesFactory from './routes/roles/factory';
import sectionsFactory from './routes/sections/factory';
import usersFactory from './routes/users/factory';
import describeApi from './routes/utils/describeApi';

const apiV1 = (config: Config): Router => {
  /** Routes below have aready /api/v1 prefix */
  const router = Router();

  /* check permissions systems:
    - https://www.moesif.com/blog/technical/restful-apis/Authorization-on-RESTful-APIs/#
    - https://cloudify.co/2016/04/15/simple-secure-role-based-access-control-rest-api-rbac-server-devops-cloud-orchestration.html 
    - https://medium.com/technology-learning/how-we-solved-authentication-and-authorization-in-our-microservice-architecture-994539d1b6e6
    - https://www.nginx.com/blog/introduction-to-microservices/
    */
  router.use(AUTH, authFactory(config));
  router.use(USERS, usersFactory(config));
  router.use(ROLES, rolesFactory(config));
  router.use(PERMISSIONS, permissionsFactory(config));
  router.use(CATEGORIES, categoriesFactory(config));
  router.use(COURSES, coursesFactory(config));
  router.use(ENROLMENTS, enrolmentsFactory(config));
  router.use(DISCOVERY_ITEMS, getDiscoveryItems(config));
  router.get(AUTOCOMPLETE, autocompleteHandler(config));
  router.use(SECTIONS, sectionsFactory(config));
  // router.use(UNITS, unitsFactory(config));
  // TODO: add route for uploading /avatar
  // TODO: add route for uploads
  // TODO: research uploading to s3: https://github.com/SanderKnape/aws-upload-to-s3
  // https://sanderknape.com/2017/08/using-pre-signed-urls-upload-file-private-s3-bucket/
  // https://stackoverflow.com/questions/40304512/get-or-put-objects-on-amazon-s3-with-pre-signed-url
  // https://www.quora.com/How-do-I-link-a-file-from-S3-to-DynamoDB
  // https://stackoverflow.com/questions/54119399/expose-port-80-on-digital-oceans-managed-kubernetes-without-a-load-balancer/55968709#55968709

  router.get(ROOT, describeApi(config));

  return router;
};

export default apiV1;
