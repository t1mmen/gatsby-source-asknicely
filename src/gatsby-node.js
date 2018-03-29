const crypto = require("crypto");
const axios = require("axios");
const he = require("he");

exports.sourceNodes = async (
  { boundActionCreators: { createNode } },
  {
    subdomain,
    apiKey,
    queryParams = {
      filter: "published",
      sinceTime: 0,
      sort: "desc",
      pageSize: 50,
      pageNumber: 1
    }
  }
) => {
  const { filter, sinceTime, sort, pageSize, pageNumber } = queryParams;
  const axiosClient = axios.create({
    baseURL: `https://${subdomain}.asknice.ly/api/v1/responses/`
  });

  // Get list of all testimonials
  const { data: { data } } = await axiosClient.get(
    `/${sort}/${pageSize}/${pageNumber}/${sinceTime}/json/${filter}`,
    { params: { "X-apikey": apiKey } }
  );

  // Create nodes for testimonials
  for (const testimonial of data) {
    const jsonString = JSON.stringify(testimonial);
    const gatsbyNode = {
      ...testimonial,
      id: testimonial.response_id,
      comment: he.unescape(testimonial.comment),
      children: [],
      parent: "__SOURCE__",
      internal: {
        type: "AskNicelyTestimonial",
        content: jsonString,
        contentDigest: crypto
          .createHash("md5")
          .update(jsonString)
          .digest("hex")
      }
    };
    // Insert data into gatsby
    createNode(gatsbyNode);
  }
};
