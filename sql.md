# _SQL_

### Update *old* url to *new* in wordpress database:
```sql
SET @old_url := 'http://localhost';
SET @new_url := 'http://example.com';

UPDATE wp_options SET option_value = replace(option_value, @old_url, @new_url) WHERE option_name = 'home' OR option_name = 'siteurl';
UPDATE wp_posts SET guid = replace(guid, @old_url, @new_url);
UPDATE wp_posts SET post_content = replace(post_content, @old_url, @new_url);
UPDATE wp_postmeta SET meta_value = replace(meta_value, @old_url, @new_url);
```
