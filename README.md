# gatsby-source-asknicely
> Loads testimonials from AskNicely into Gatsby.js

## Installation

```bash
npm install gatsby-source-asknicely
```

## Usage

To use this source you need to supply an AskNicely API key and your AskNicely subdomain. You can create an API key by logging into AskNicely and going to `Cog > API`. You can see your subdomain by logging into your AskNicely backend and checking the URL, e.g. `mycompany.asknicely.com`.

Next, edit `gatsby-config.js` to use the plugin:
```javascript
{
    ...
    plugins: [
    ...
    {
      resolve: 'gatsby-source-asknicely',
      options: {
        subdomain: 'mycompany',
        apiKey: 'abc-123',
        // optional
        queryParams: {
            // See API docs
            // NB: camelCased!
        }
      },
    },
  ]
}
```

By default, `gatsby-source-asknicely` will only retrieve testimonials that are published. To change this behavior, you can also supply an optional `queryParams` parameter inside of `options`. Possible query parameters are detailed in [AskNicely's API Documentation](https://timelyapp.asknice.ly/help/responses), **but camelCased**! (ie, `pagesize` = `pageSize`, `since_time` = `sinceTime`)

## Querying

You can query the nodes created by the plugin as follows:
```graphql
{
    allAskNicelyTestimonial {
        edges {
            node {
                ...
            }
        }
    }
}
```

## Thanks
Based on [@tumblbug's](https://github.com/tumblbug) [gatsby-source-workable](https://github.com/tumblbug/gatsby-source-workable)