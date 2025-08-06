import type { Schema, Struct } from '@strapi/strapi';

export interface RecipeIngredients extends Struct.ComponentSchema {
  collectionName: 'components_recipe_ingredients';
  info: {
    description: '';
    displayName: 'Ingredient';
  };
  attributes: {
    name: Schema.Attribute.String;
    qty: Schema.Attribute.Decimal;
    unit: Schema.Attribute.Enumeration<
      [
        'none',
        'g',
        'mg',
        'kg',
        'l',
        'ml',
        'cuill\u00E8re a soupe',
        'cuill\u00E8re \u00E0 caf\u00E9',
        'tasse',
      ]
    > &
      Schema.Attribute.DefaultTo<'g'>;
  };
}

export interface RecipeNutritionalInformation extends Struct.ComponentSchema {
  collectionName: 'components_recipe_nutritional_informations';
  info: {
    description: '';
    displayName: 'nutritional Information';
  };
  attributes: {
    calories: Schema.Attribute.String;
    glucides: Schema.Attribute.String;
    lipides: Schema.Attribute.String;
    proteine: Schema.Attribute.String;
    sodium: Schema.Attribute.String;
    sucre: Schema.Attribute.String;
  };
}

export interface RecipeRate extends Struct.ComponentSchema {
  collectionName: 'components_recipe_rates';
  info: {
    displayName: 'rate';
  };
  attributes: {
    content: Schema.Attribute.Text;
    star: Schema.Attribute.Integer;
  };
}

export interface SharedMetaSocial extends Struct.ComponentSchema {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
  };
  attributes: {
    description: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    socialNetwork: Schema.Attribute.Enumeration<['Facebook', 'Twitter']> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'seo';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    keywords: Schema.Attribute.Text;
    metaRobots: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'index, follow'>;
    metaSocial: Schema.Attribute.Component<'shared.meta-social', true>;
  };
}

export interface UiBanner extends Struct.ComponentSchema {
  collectionName: 'components_ui_banners';
  info: {
    displayName: 'banner';
    icon: 'hashtag';
  };
  attributes: {
    background: Schema.Attribute.Blocks;
    message: Schema.Attribute.Text;
  };
}

export interface UiCard extends Struct.ComponentSchema {
  collectionName: 'components_ui_cards';
  info: {
    description: '';
    displayName: 'card';
  };
  attributes: {
    cover: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface UiCell extends Struct.ComponentSchema {
  collectionName: 'components_ui_cells';
  info: {
    displayName: 'cell';
    icon: 'chartBubble';
  };
  attributes: {};
}

export interface UiGallery extends Struct.ComponentSchema {
  collectionName: 'components_ui_galleries';
  info: {
    displayName: 'gallery';
    icon: 'landscape';
  };
  attributes: {
    titlr: Schema.Attribute.String;
  };
}

export interface UiGrid extends Struct.ComponentSchema {
  collectionName: 'components_ui_grids';
  info: {
    description: '';
    displayName: 'Grid';
    icon: 'apps';
  };
  attributes: {
    cells: Schema.Attribute.JSON;
    title: Schema.Attribute.String;
  };
}

export interface UiImage extends Struct.ComponentSchema {
  collectionName: 'components_ui_images';
  info: {
    displayName: 'image';
    icon: 'picture';
  };
  attributes: {
    alternativeText: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface UiListCard extends Struct.ComponentSchema {
  collectionName: 'components_ui_list_cards';
  info: {
    displayName: 'list-card';
  };
  attributes: {
    List: Schema.Attribute.Component<'ui.card', true>;
    Title: Schema.Attribute.String;
  };
}

export interface UiQuote extends Struct.ComponentSchema {
  collectionName: 'components_ui_quotes';
  info: {
    displayName: 'quote';
    icon: 'feather';
  };
  attributes: {
    author: Schema.Attribute.String;
    content: Schema.Attribute.Text;
  };
}

export interface UiText extends Struct.ComponentSchema {
  collectionName: 'components_ui_texts';
  info: {
    displayName: 'text';
  };
  attributes: {
    content: Schema.Attribute.RichText;
  };
}

export interface UiVideo extends Struct.ComponentSchema {
  collectionName: 'components_ui_videos';
  info: {
    displayName: 'video';
    icon: 'play';
  };
  attributes: {
    height: Schema.Attribute.String;
    url: Schema.Attribute.String;
    width: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
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
