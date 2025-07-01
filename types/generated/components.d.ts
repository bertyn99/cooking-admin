import type { Attribute, Schema } from '@strapi/strapi';

export interface RecipeIngredients extends Schema.Component {
  collectionName: 'components_recipe_ingredients';
  info: {
    description: '';
    displayName: 'Ingredient';
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
    description: '';
    displayName: 'nutritional Information';
  };
  attributes: {
    calories: Attribute.String;
    glucides: Attribute.String;
    lipides: Attribute.String;
    proteine: Attribute.String;
    sodium: Attribute.String;
    sucre: Attribute.String;
  };
}

export interface RecipeRate extends Schema.Component {
  collectionName: 'components_recipe_rates';
  info: {
    displayName: 'rate';
  };
  attributes: {
    content: Attribute.Text;
    star: Attribute.Integer;
  };
}

export interface SharedMetaSocial extends Schema.Component {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
  };
  attributes: {
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Attribute.Media<'images' | 'files' | 'videos'>;
    socialNetwork: Attribute.Enumeration<['Facebook', 'Twitter']> &
      Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'seo';
  };
  attributes: {
    description: Attribute.Text &
      Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    keywords: Attribute.Text;
    metaRobots: Attribute.String & Attribute.DefaultTo<'index, follow'>;
    metaSocial: Attribute.Component<'shared.meta-social', true>;
  };
}

export interface UiBanner extends Schema.Component {
  collectionName: 'components_ui_banners';
  info: {
    displayName: 'banner';
    icon: 'hashtag';
  };
  attributes: {
    background: Attribute.Blocks;
    message: Attribute.Text;
  };
}

export interface UiCard extends Schema.Component {
  collectionName: 'components_ui_cards';
  info: {
    description: '';
    displayName: 'card';
  };
  attributes: {
    cover: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Attribute.String;
  };
}

export interface UiCell extends Schema.Component {
  collectionName: 'components_ui_cells';
  info: {
    displayName: 'cell';
    icon: 'chartBubble';
  };
  attributes: {};
}

export interface UiGallery extends Schema.Component {
  collectionName: 'components_ui_galleries';
  info: {
    displayName: 'gallery';
    icon: 'landscape';
  };
  attributes: {
    titlr: Attribute.String;
  };
}

export interface UiGrid extends Schema.Component {
  collectionName: 'components_ui_grids';
  info: {
    description: '';
    displayName: 'Grid';
    icon: 'apps';
  };
  attributes: {
    cells: Attribute.JSON;
    title: Attribute.String;
  };
}

export interface UiImage extends Schema.Component {
  collectionName: 'components_ui_images';
  info: {
    displayName: 'image';
    icon: 'picture';
  };
  attributes: {
    alternativeText: Attribute.String;
    caption: Attribute.String;
    url: Attribute.String;
  };
}

export interface UiListCard extends Schema.Component {
  collectionName: 'components_ui_list_cards';
  info: {
    displayName: 'list-card';
  };
  attributes: {
    List: Attribute.Component<'ui.card', true>;
    Title: Attribute.String;
  };
}

export interface UiQuote extends Schema.Component {
  collectionName: 'components_ui_quotes';
  info: {
    displayName: 'quote';
    icon: 'feather';
  };
  attributes: {
    author: Attribute.String;
    content: Attribute.Text;
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

export interface UiVideo extends Schema.Component {
  collectionName: 'components_ui_videos';
  info: {
    displayName: 'video';
    icon: 'play';
  };
  attributes: {
    height: Attribute.String;
    url: Attribute.String;
    width: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'recipe.ingredients': RecipeIngredients;
      'recipe.nutritional-information': RecipeNutritionalInformation;
      'recipe.rate': RecipeRate;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
      'ui.banner': UiBanner;
      'ui.card': UiCard;
      'ui.cell': UiCell;
      'ui.gallery': UiGallery;
      'ui.grid': UiGrid;
      'ui.image': UiImage;
      'ui.list-card': UiListCard;
      'ui.quote': UiQuote;
      'ui.text': UiText;
      'ui.video': UiVideo;
    }
  }
}
