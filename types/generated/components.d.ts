import type { Schema, Attribute } from '@strapi/strapi';

export interface JoLklk extends Schema.Component {
  collectionName: 'components_jo_lklks';
  info: {
    displayName: 'lklk';
  };
  attributes: {
    ll: Attribute.String;
  };
}

export interface RecipeIngredients extends Schema.Component {
  collectionName: 'components_recipe_ingredients';
  info: {
    displayName: 'Ingredient';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    qty: Attribute.Decimal;
    unit: Attribute.Enumeration<
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
      Attribute.DefaultTo<'g'>;
  };
}

export interface RecipeNutritionalInformation extends Schema.Component {
  collectionName: 'components_recipe_nutritional_informations';
  info: {
    displayName: 'nutritional Information';
    description: '';
  };
  attributes: {
    lipides: Attribute.String;
    proteine: Attribute.String;
    sucre: Attribute.String;
    calories: Attribute.String;
    glucides: Attribute.String;
    sodium: Attribute.String;
  };
}

export interface RecipeRate extends Schema.Component {
  collectionName: 'components_recipe_rates';
  info: {
    displayName: 'rate';
  };
  attributes: {
    star: Attribute.Integer;
    content: Attribute.Text;
  };
}

export interface SharedMetaSocial extends Schema.Component {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
  };
  attributes: {
    socialNetwork: Attribute.Enumeration<['Facebook', 'Twitter']> &
      Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Attribute.Media;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    description: '';
  };
  attributes: {
    metaSocial: Attribute.Component<'shared.meta-social', true>;
    metaRobots: Attribute.String & Attribute.DefaultTo<'index, follow'>;
    description: Attribute.Text &
      Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    keywords: Attribute.Text;
  };
}

export interface UiCard extends Schema.Component {
  collectionName: 'components_ui_cards';
  info: {
    displayName: 'card';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    cover: Attribute.Media;
  };
}

export interface UiListCard extends Schema.Component {
  collectionName: 'components_ui_list_cards';
  info: {
    displayName: 'list-card';
  };
  attributes: {
    Title: Attribute.String;
    List: Attribute.Component<'ui.card', true>;
  };
}

export interface UiText extends Schema.Component {
  collectionName: 'components_ui_texts';
  info: {
    displayName: 'text';
  };
  attributes: {
    content: Attribute.RichText;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
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
