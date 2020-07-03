import scrapy
import json

from scrapy.utils.markup import remove_tags

class DiscogsSpider(scrapy.Spider):
    name = "discogs"
    allowed_domains = ['discogs.com']
    login_page = 'https://auth.discogs.com/login'
    start_urls = [
        'https://www.discogs.com/sell/mywants?sort=listed%2Cdesc&limit=40&ev=wsim&sort_order=desc&page=1',
    ]

    def parse(self, response):
        with open('config.json') as json_file:
            data = json.load(json_file)

            print('Making login')

            inputHiddenToken = str(response.xpath('//form[@id="login-form"]/input[@name="authenticity_token"]/@value').extract_first())
            inputHiddenLt = str(response.xpath('//form[@id="login-form"]/input[@name="lt"]/@value').extract_first())
            print('inputHiddenToken')
            print(inputHiddenToken)
            print('inputHiddenLt')
            print(inputHiddenLt)

            return scrapy.FormRequest.from_response(
                response,
                formxpath='//form[@id="login-form"]',
                formdata={'username': data['discogs']['username'], 'password': data['discogs']['password'], 'authenticity_token': inputHiddenToken, 'lt': inputHiddenLt},
                callback=self.parse_item
            )

    def parse_item(self, response):
        print('Logged, scrapping')
        for discogs in response.css('tr.shortcut_navigable'):
            location = discogs.css('td.seller_info li:nth-child(3)::text').extract()
            condition_media = discogs.css('td.item_description p.item_condition span:nth-child(3)').xpath('normalize-space(text())').extract()
            condition_sleeve = discogs.css('td.item_description p.item_condition span:nth-child(7)').xpath('normalize-space(text())').extract()

            items = {
                'id_discogs': discogs.css('td.item_add_to_cart a.button').xpath('@data-item-id').extract(),
                'artist': discogs.css('td.item_description a.item_description_title::text').extract(),
                'description': discogs.css('td.item_description p.hide_mobile').xpath('normalize-space(text())').extract(),
                'price': discogs.css('td.item_price span.price::text').extract(),
                'image': discogs.css('td.item_picture a.thumbnail-lazyload img.marketplace_image').xpath('@data-src').extract(),
                'url_cart': discogs.css('td.item_add_to_cart a.button').xpath('@href').extract(),
                'url_release': discogs.css('td.item_description a.item_release_link').xpath('@href').extract(),
                'url_details': discogs.css('td.item_picture a.thumbnail-lazyload').xpath('@href').extract(),
                'url_seller': discogs.css('td.seller_info ul li strong a').xpath('@href').extract(),
                'seller': discogs.css('td.seller_info ul li strong a').xpath('normalize-space(text())').extract(),
                'location': location if location else '-',
                'condition_media': condition_media if condition_media else '-',
                'condition_sleeve': condition_sleeve if condition_sleeve else '-',
            }

            for i in range(len(items.get('id_discogs'))):
                yield {
                    'id_discogs': items.get('id_discogs')[i],
                    'artist': items.get('artist')[i],
                    'description': items.get('description')[1],
                    'price': items.get('price')[i],
                    'image': items.get('image')[i],
                    'url_release': items.get('url_release')[i],
                    'url_cart': items.get('url_cart')[i],
                    'url_details': items.get('url_details')[i],
                    'url_seller': items.get('url_seller')[i],
                    'seller': items.get('seller')[i],
                    'location': items.get('location')[i],
                    'condition_media': items.get('condition_media')[i],
                    'condition_sleeve': items.get('condition_sleeve')[i]
                }