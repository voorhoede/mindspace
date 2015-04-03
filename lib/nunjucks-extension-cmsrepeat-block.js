/**
 * Nunjucks extension for {% cms_repeat <cmstag> %}<placeholder>{% endcms_repeat %} blocks
 * @param {boolean} renderTags If true, will render cms-usable tags
 * @return {string}
 */
module.exports = function cmsRepeatBlock(renderTags) {
  this.tags = ['cms_repeat'];
  this._name = 'cmsRepeatBlock';

  // Note: most of this method comes from Nunjucks examples & source code
  this.parse = function(parser, nodes, lexer) {
    var tok = parser.nextToken(),
        args = parser.parseSignature(null, true),
        body;
    parser.advanceAfterBlockEnd(tok.value);
    body = parser.parseUntilBlocks('endcms_repeat');
    parser.advanceAfterBlockEnd();
    return new nodes.CallExtension(this, 'run', args, [ body ]);
  };

  this.run = function(context, args, body) {
    if (renderTags) {
      var block;

      block  = '{% for item in cms.' + args + ' %}\n';
      block += body() + '\n';
      block += '{% endfor %}\n';

      return block;
    } else {
      if (body().length > 0) {
        return body();
      } else {
        return args.toUpperCase();
      }
    }
  };
};
