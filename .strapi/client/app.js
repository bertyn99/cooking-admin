/**
 * This file was automatically generated by Strapi.
 * Any modifications made will be discarded.
 */
import calendar from "@offset-dev/strapi-calendar/strapi-admin";
import documentation from "@strapi/plugin-documentation/strapi-admin";
import i18N from "@strapi/plugin-i18n/strapi-admin";
import seo from "@strapi/plugin-seo/strapi-admin";
import usersPermissions from "@strapi/plugin-users-permissions/strapi-admin";
import publisher from "strapi-plugin-publisher/strapi-admin";
import { renderAdmin } from "@strapi/strapi/admin";

renderAdmin(document.getElementById("strapi"), {
  plugins: {
    calendar: calendar,
    documentation: documentation,
    i18n: i18N,
    seo: seo,
    "users-permissions": usersPermissions,
    publisher: publisher,
  },
});
