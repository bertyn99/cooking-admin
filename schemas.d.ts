import {
  CollectionTypeSchema,
  StringAttribute,
  RequiredAttribute,
  SetMinMaxLength,
  JSONAttribute,
  DefaultTo,
  RelationAttribute,
  DateTimeAttribute,
  PrivateAttribute,
  EmailAttribute,
  UniqueAttribute,
  PasswordAttribute,
  BooleanAttribute,
  EnumerationAttribute,
  BigIntegerAttribute,
  IntegerAttribute,
  DecimalAttribute,
  SetMinMax,
  RichTextAttribute,
  SetPluginOptions,
  MediaAttribute,
  UIDAttribute,
  ComponentAttribute,
  TextAttribute,
  DynamicZoneAttribute,
  ComponentSchema,
} from '@strapi/strapi';

export interface AdminPermission extends CollectionTypeSchema {
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    subject: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: JSONAttribute & DefaultTo<{}>;
    conditions: JSONAttribute & DefaultTo<[]>;
    role: RelationAttribute<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminUser extends CollectionTypeSchema {
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    username: StringAttribute;
    email: EmailAttribute &
      RequiredAttribute &
      PrivateAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    registrationToken: StringAttribute & PrivateAttribute;
    isActive: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    roles: RelationAttribute<'admin::user', 'manyToMany', 'admin::role'> &
      PrivateAttribute;
    blocked: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    preferedLanguage: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminRole extends CollectionTypeSchema {
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    code: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute;
    users: RelationAttribute<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: RelationAttribute<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminApiToken extends CollectionTypeSchema {
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<''>;
    type: EnumerationAttribute<['read-only', 'full-access', 'custom']> &
      RequiredAttribute &
      DefaultTo<'read-only'>;
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: DateTimeAttribute;
    permissions: RelationAttribute<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: DateTimeAttribute;
    lifespan: BigIntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminApiTokenPermission extends CollectionTypeSchema {
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    token: RelationAttribute<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminTransferToken extends CollectionTypeSchema {
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<''>;
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: DateTimeAttribute;
    permissions: RelationAttribute<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: DateTimeAttribute;
    lifespan: BigIntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminTransferTokenPermission extends CollectionTypeSchema {
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    token: RelationAttribute<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFile extends CollectionTypeSchema {
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    alternativeText: StringAttribute;
    caption: StringAttribute;
    width: IntegerAttribute;
    height: IntegerAttribute;
    formats: JSONAttribute;
    hash: StringAttribute & RequiredAttribute;
    ext: StringAttribute;
    mime: StringAttribute & RequiredAttribute;
    size: DecimalAttribute & RequiredAttribute;
    url: StringAttribute & RequiredAttribute;
    previewUrl: StringAttribute;
    provider: StringAttribute & RequiredAttribute;
    provider_metadata: JSONAttribute;
    related: RelationAttribute<'plugin::upload.file', 'morphToMany'>;
    folder: RelationAttribute<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      PrivateAttribute;
    folderPath: StringAttribute &
      RequiredAttribute &
      PrivateAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFolder extends CollectionTypeSchema {
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    pathId: IntegerAttribute & RequiredAttribute & UniqueAttribute;
    parent: RelationAttribute<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginPublisherAction extends CollectionTypeSchema {
  info: {
    singularName: 'action';
    pluralName: 'actions';
    displayName: 'actions';
  };
  options: {
    draftAndPublish: false;
    comment: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    executeAt: DateTimeAttribute;
    mode: StringAttribute;
    entityId: IntegerAttribute;
    entitySlug: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::publisher.action',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::publisher.action',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginI18NLocale extends CollectionTypeSchema {
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: StringAttribute & UniqueAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsPermission extends CollectionTypeSchema {
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute & RequiredAttribute;
    role: RelationAttribute<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsRole extends CollectionTypeSchema {
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    description: StringAttribute;
    type: StringAttribute & UniqueAttribute;
    permissions: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsUser extends CollectionTypeSchema {
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    email: EmailAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: StringAttribute;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    confirmationToken: StringAttribute & PrivateAttribute;
    confirmed: BooleanAttribute & DefaultTo<false>;
    blocked: BooleanAttribute & DefaultTo<false>;
    role: RelationAttribute<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiArticleArticle extends CollectionTypeSchema {
  info: {
    singularName: 'article';
    pluralName: 'articles';
    displayName: 'Article';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    content: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    cover: MediaAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    slug: UIDAttribute<'api::article.article', 'title'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    seo: ComponentAttribute<'shared.seo', true> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    comments: RelationAttribute<
      'api::article.article',
      'oneToMany',
      'api::comment.comment'
    >;
    categories: RelationAttribute<
      'api::article.article',
      'manyToMany',
      'api::category-article.category-article'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::article.article',
      'oneToMany',
      'api::article.article'
    >;
    locale: StringAttribute;
  };
}

export interface ApiCategoryCategory extends CollectionTypeSchema {
  info: {
    singularName: 'category';
    pluralName: 'categories';
    displayName: 'Category';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    desc: TextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    img: MediaAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    recipes: RelationAttribute<
      'api::category.category',
      'manyToMany',
      'api::recipe.recipe'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::category.category',
      'oneToMany',
      'api::category.category'
    >;
    locale: StringAttribute;
  };
}

export interface ApiCategoryArticleCategoryArticle
  extends CollectionTypeSchema {
  info: {
    singularName: 'category-article';
    pluralName: 'category-articles';
    displayName: 'CategoryArticle';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute;
    articles: RelationAttribute<
      'api::category-article.category-article',
      'manyToMany',
      'api::article.article'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::category-article.category-article',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::category-article.category-article',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiCommentComment extends CollectionTypeSchema {
  info: {
    singularName: 'comment';
    pluralName: 'comments';
    displayName: 'Comment';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    content: RichTextAttribute;
    article: RelationAttribute<
      'api::comment.comment',
      'manyToOne',
      'api::article.article'
    >;
    author: StringAttribute;
    email: EmailAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::comment.comment',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::comment.comment',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiPagePage extends CollectionTypeSchema {
  info: {
    singularName: 'page';
    pluralName: 'pages';
    displayName: 'Page';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    slug: UIDAttribute<'api::page.page', 'title'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Content: DynamicZoneAttribute<['ui.card', 'ui.list-card', 'ui.text']> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    seoMeta: ComponentAttribute<'shared.seo'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    parent: RelationAttribute<'api::page.page', 'oneToOne', 'api::page.page'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'api::page.page', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'api::page.page', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::page.page',
      'oneToMany',
      'api::page.page'
    >;
    locale: StringAttribute;
  };
}

export interface ApiRecipeRecipe extends CollectionTypeSchema {
  info: {
    singularName: 'recipe';
    pluralName: 'recipes';
    displayName: 'Recipe';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Intro: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    cover: MediaAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Ingredient: ComponentAttribute<'recipe.ingredients', true> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    categories: RelationAttribute<
      'api::recipe.recipe',
      'manyToMany',
      'api::category.category'
    >;
    step: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    slug: UIDAttribute<'api::recipe.recipe', 'title'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    difficulty: EnumerationAttribute<['easy', 'medium', 'hard']> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      DefaultTo<'easy'>;
    time: IntegerAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    nutrition: ComponentAttribute<'recipe.nutritional-information'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    seo: ComponentAttribute<'shared.seo', true> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    reviews: ComponentAttribute<'recipe.rate', true> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    tags: RelationAttribute<'api::recipe.recipe', 'manyToMany', 'api::tag.tag'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::recipe.recipe',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::recipe.recipe',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::recipe.recipe',
      'oneToMany',
      'api::recipe.recipe'
    >;
    locale: StringAttribute;
  };
}

export interface ApiReviewReview extends CollectionTypeSchema {
  info: {
    singularName: 'review';
    pluralName: 'reviews';
    displayName: 'Review';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    content: RichTextAttribute;
    rate: IntegerAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 0;
        max: 5;
      }>;
    name: StringAttribute;
    email: EmailAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::review.review',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::review.review',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiTagTag extends CollectionTypeSchema {
  info: {
    singularName: 'tag';
    pluralName: 'tags';
    displayName: 'Tag';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    recipes: RelationAttribute<
      'api::tag.tag',
      'manyToMany',
      'api::recipe.recipe'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'api::tag.tag', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'api::tag.tag', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::tag.tag',
      'oneToMany',
      'api::tag.tag'
    >;
    locale: StringAttribute;
  };
}

export interface JoLklk extends ComponentSchema {
  info: {
    displayName: 'lklk';
  };
  attributes: {
    ll: StringAttribute;
  };
}

export interface RecipeIngredients extends ComponentSchema {
  info: {
    displayName: 'Ingredient';
    description: '';
  };
  attributes: {
    name: StringAttribute;
    qty: DecimalAttribute;
    unit: EnumerationAttribute<
      [
        'none',
        'g',
        'kg',
        'l',
        'cuill\u00E8re a soupe',
        'cuill\u00E8re \u00E0 caf\u00E9',
        'tasse'
      ]
    > &
      DefaultTo<'g'>;
  };
}

export interface RecipeNutritionalInformation extends ComponentSchema {
  info: {
    displayName: 'nutritional Information';
    description: '';
  };
  attributes: {
    lipides: StringAttribute;
    proteine: StringAttribute;
    sucre: StringAttribute;
    calories: StringAttribute;
    glucides: StringAttribute;
    sodium: StringAttribute;
  };
}

export interface RecipeRate extends ComponentSchema {
  info: {
    displayName: 'rate';
  };
  attributes: {
    star: IntegerAttribute;
    content: TextAttribute;
  };
}

export interface SharedMetaSocial extends ComponentSchema {
  info: {
    displayName: 'metaSocial';
  };
  attributes: {
    socialNetwork: EnumerationAttribute<['Facebook', 'Twitter']> &
      RequiredAttribute;
    title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: MediaAttribute;
  };
}

export interface SharedSeo extends ComponentSchema {
  info: {
    displayName: 'seo';
    description: '';
  };
  attributes: {
    metaSocial: ComponentAttribute<'shared.meta-social', true>;
    metaRobots: StringAttribute & DefaultTo<'index, follow'>;
    description: TextAttribute &
      SetMinMaxLength<{
        maxLength: 160;
      }>;
    keywords: TextAttribute;
  };
}

export interface UiCard extends ComponentSchema {
  info: {
    displayName: 'card';
    description: '';
  };
  attributes: {
    title: StringAttribute;
    cover: MediaAttribute;
  };
}

export interface UiListCard extends ComponentSchema {
  info: {
    displayName: 'list-card';
  };
  attributes: {
    Title: StringAttribute;
    List: ComponentAttribute<'ui.card', true>;
  };
}

export interface UiText extends ComponentSchema {
  info: {
    displayName: 'text';
  };
  attributes: {
    content: RichTextAttribute;
  };
}

declare global {
  namespace Strapi {
    interface Schemas {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::publisher.action': PluginPublisherAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::article.article': ApiArticleArticle;
      'api::category.category': ApiCategoryCategory;
      'api::category-article.category-article': ApiCategoryArticleCategoryArticle;
      'api::comment.comment': ApiCommentComment;
      'api::page.page': ApiPagePage;
      'api::recipe.recipe': ApiRecipeRecipe;
      'api::review.review': ApiReviewReview;
      'api::tag.tag': ApiTagTag;
      'jo.lklk': JoLklk;
      'recipe.ingredients': RecipeIngredients;
      'recipe.nutritional-information': RecipeNutritionalInformation;
      'recipe.rate': RecipeRate;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
      'ui.card': UiCard;
      'ui.list-card': UiListCard;
      'ui.text': UiText;
    }
  }
}
