/**
 * Nunjucks extension for {% cms <cmstag> %}<placeholder>{% endcms %} blocks
 *
 * Block usage in template:
 *   <h1>{% cms "homepage.title" %}Welcome{% endcms %}</h1>
 * Renders in guide:
 *   <h1>Welcome</h1>
 * Renders in cms templates:
 *   <h1>{{ cms.homepage.title }}</h1>
 *
 * If cms tag is a single word or for an image, it will be rendered
 * as an 'item' tag, meaning the template is assumed to be used in an iterator.
 *
 * Block usage in template:
 *   <h2>{% cms "name" %}John Wayne{% endcms %}</h2>
 *   <img src="{% cms "image.url" %}http://placehold.it/200x200{% endcms %}">
 * Renders in guide:
 *   <h2>John Wayne</h2>
 *   <img src="http://placehold.it/200x200">
 * Renders in cms templates:
 *   <h2>{{ item.name }}</h2>
 *   <img src="{{ item.image.url }}">
 *
 * If no placeholder is used, in guide templates the tag will be used
 * so that QA knows content should be provided via CMS or is not yet done.
 *
 * @param {boolean} renderTags If true, will render cms-usable tags
 * @return {string}
 */
module.exports = function cmsBlock(renderTags) {
  this.tags = ['cms'];
  this._name = 'cmsBlock';

  // Note: most of this method comes from Nunjucks examples & source code
  this.parse = function(parser, nodes, lexer) {
    var tok = parser.nextToken(),
        args = parser.parseSignature(null, true),
        body;
    parser.advanceAfterBlockEnd(tok.value);
    body = parser.parseUntilBlocks('endcms');
    parser.advanceAfterBlockEnd();
    return new nodes.CallExtension(this, 'run', args, [ body ]);
  };

  this.run = function(context, args, body) {
    if (renderTags) {
      // @TODO: maybe add separate tag for {% cms_page ... %} and {% cms_iterator ... %} ?
      var tags = args.split('.');
      if (tags.length === 1 || tags[0] === 'image') {
        return '{{ item.' + args + ' }}'; // assumes {% cms "title" %} or {% cms "image.url" %} will get content from iterator
      } else {
        return '{{ cms.' + args + ' }}';  // assumes {% cms "homepage.title" %} will get content directly from cms
      }
    } else {
      if (body().length > 0) {
        return body();
      } else {
        return args.toUpperCase();
      }
    }
  };
};
