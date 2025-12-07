# ISP Media Vault - Configuration Guide

Quick reference for customizing the ISP Media Vault portal for your organization.

## 🎯 Essential Configuration Steps

### Step 1: Update ISP Branding

**File**: `index.html`

Find and replace these sections:

```html
<!-- BEFORE -->
<div class="logo-placeholder">ISP</div>
<h1>ISP Media Vault</h1>
<p class="tagline">Your Local Download Center</p>

<!-- AFTER -->
<div class="logo-placeholder">ABC</div>  <!-- Your ISP abbreviation -->
<h1>ABC Media Vault</h1>
<p class="tagline">Your Local Download Center</p>
```

### Step 2: Configure FTP Server Address

**File**: `index.html`

Replace all FTP URLs. Find all instances of:
```
ftp://media.isp.local/
```

Replace with your actual FTP server:
```
ftp://192.168.1.100/
```
or
```
ftp://media.yourisp.com/
```

**Example**: 
```html
<!-- BEFORE -->
<a href="ftp://media.isp.local/Software/ISP_Router_Config_v2.1.exe"

<!-- AFTER -->
<a href="ftp://192.168.1.100/Software/ISP_Router_Config_v2.1.exe"
```

### Step 3: Update Homepage Link

**File**: `index.html`

Replace:
```html
<a href="https://www.example-isp.com" class="home-link">
```

With your ISP's homepage:
```html
<a href="https://www.yourisp.com" class="home-link">
```

### Step 4: Update Footer Links

**File**: `index.html`

Update all footer links:
```html
<li><a href="https://www.example-isp.com">ISP Homepage</a></li>
<li><a href="https://www.example-isp.com/support">Support Center</a></li>
<li><a href="https://www.example-isp.com/contact">Contact Us</a></li>
<li><a href="https://www.example-isp.com/privacy">Privacy Policy</a></li>
```

Replace with your actual URLs.

### Step 5: Update Contact Information

**File**: `index.html`

Find the footer support section and update:
```html
<p><strong>Email:</strong> support@isp.local</p>
<p><strong>Phone:</strong> 1-800-ISP-HELP</p>
```

Replace with your actual contact details.

---

## 🎨 Visual Customization

### Change Color Scheme

**File**: `styles.css`

Locate the `:root` CSS variables (around line 10):

```css
:root {
    --primary-color: #0052cc;        /* Main blue */
    --primary-dark: #003d99;         /* Dark blue */
    --secondary-color: #f5a623;      /* Orange accent */
    --success-color: #27ae60;        /* Green for download button */
    /* ... */
}
```

**Common Color Changes**:

| Element | Variable | Example Value |
|---------|----------|----------------|
| Primary Brand Color | `--primary-color` | `#ff6b35` (orange) |
| Dark Variant | `--primary-dark` | `#cc5500` |
| Accent Color | `--secondary-color` | `#00d4ff` (cyan) |
| Download Button | `--success-color` | `#ff6b35` (orange) |

**Example**: Change to red theme
```css
:root {
    --primary-color: #d32f2f;        /* Red */
    --primary-dark: #b71c1c;         /* Dark red */
    --secondary-color: #ff9800;      /* Orange accent */
    --success-color: #d32f2f;        /* Red button */
}
```

### Add Custom Logo Image

**File**: `index.html`

Replace:
```html
<div class="logo-placeholder">ISP</div>
```

With:
```html
<img src="logo.png" alt="Company Logo" class="logo-image">
```

Then add to `styles.css`:
```css
.logo-image {
    width: 60px;
    height: 60px;
    object-fit: contain;
    flex-shrink: 0;
}
```

Place your `logo.png` file in the same directory as `index.html`.

### Change Font Family

**File**: `styles.css`

Update the `--font-sans` variable:
```css
:root {
    /* Default (System fonts) */
    --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    
    /* Alternative: Google Fonts */
    --font-sans: 'Poppins', sans-serif;
    
    /* Alternative: Professional */
    --font-sans: 'Georgia', serif;
}
```

If using Google Fonts, add to `<head>` in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
```

---

## 📝 Content Management

### Add New Content Item

**File**: `index.html`

1. Find the category where you want to add content (e.g., `<!-- Category: Software -->`)
2. Copy an existing `<article class="content-item">` block
3. Update all fields:

```html
<article class="content-item">
    <div class="item-header">
        <h3>Your File Name</h3>
        <span class="file-type">FILE TYPE</span>
    </div>
    <div class="item-metadata">
        <p><strong>File Size:</strong> XX.X MB</p>
        <p><strong>Upload Date:</strong> Month DD, YYYY</p>
        <p class="item-description">Your file description here.</p>
    </div>
    <div class="item-actions">
        <a href="ftp://your-server/path/filename.ext" 
           download="filename.ext"
           class="download-btn"
           aria-label="Download Your File Name">
            <span class="btn-icon">⬇</span> Download
        </a>
    </div>
</article>
```

### Add New Category

**File**: `index.html`

Add a new section after an existing category:

```html
<section class="content-category" aria-labelledby="new-category-heading">
    <h2 id="new-category-heading" class="category-heading">Your Category Name</h2>
    <div class="content-grid">
        <!-- Add content items here -->
    </div>
</section>
```

### Remove Content Item

Simply delete the entire `<article class="content-item">` block.

### Remove Category

Delete the entire `<section class="content-category">` block.

---

## 🔒 Security Configuration

### Enable Anonymous FTP Access

On your FTP server, configure:
1. Enable anonymous FTP login
2. Set read-only permissions for anonymous users
3. Restrict to the media directory only

### Use Token-Based URLs (If Anonymous Not Allowed)

Replace FTP URLs with credentials:
```html
<a href="ftp://username:password@server-ip/path/file.ext"
```

⚠️ **Warning**: This exposes credentials in HTML source. Only use on internal networks.

### HTTPS for Web Portal

If hosting on the public internet, use HTTPS:
1. Obtain an SSL certificate
2. Configure your web server for HTTPS
3. Update all links to use `https://`

---

## 📊 Analytics & Monitoring

### Track Download Clicks

Add Google Analytics (optional):

Add to `<head>` in `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Replace `GA_MEASUREMENT_ID` with your actual Google Analytics ID.

### Monitor FTP Server

Enable FTP server logging to track:
- Download frequency
- Popular files
- User access patterns

---

## ✅ Pre-Deployment Checklist

- [ ] All FTP URLs updated to your server
- [ ] ISP branding (logo, name, colors) customized
- [ ] Homepage and footer links updated
- [ ] Contact information accurate
- [ ] All content items have correct file sizes and dates
- [ ] FTP server is accessible from client network
- [ ] Anonymous FTP access enabled (or token URLs configured)
- [ ] Page tested on desktop, tablet, and mobile
- [ ] All download buttons functional
- [ ] Page loads in under 2 seconds
- [ ] Keyboard navigation works (Tab through all links)
- [ ] Dark mode displays correctly
- [ ] No console errors in browser DevTools

---

## 🚀 Deployment

### Option 1: Simple HTTP Server (Testing)

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (with http-server)
npx http-server
```

Then visit: `http://localhost:8000`

### Option 2: Apache Web Server

1. Copy files to Apache document root:
   ```
   /var/www/html/ispdownloader/
   ```

2. Access at: `http://your-server-ip/ispdownloader/`

### Option 3: Nginx Web Server

1. Copy files to Nginx document root:
   ```
   /usr/share/nginx/html/ispdownloader/
   ```

2. Configure Nginx:
   ```nginx
   server {
       listen 80;
       server_name media.yourisp.com;
       root /usr/share/nginx/html;
       index index.html;
   }
   ```

3. Access at: `http://media.yourisp.com/ispdownloader/`

---

## 🆘 Troubleshooting

### Downloads Don't Start

**Problem**: Clicking download button does nothing

**Solutions**:
1. Verify FTP server is running and accessible
2. Test FTP URL in file manager or FTP client
3. Check firewall rules allow FTP (port 21)
4. Verify anonymous access is enabled

### Page Loads Slowly

**Problem**: Page takes more than 2 seconds to load

**Solutions**:
1. Check network connectivity to FTP server
2. Verify no large images are embedded
3. Test from different network location
4. Check web server performance

### Mobile Layout Broken

**Problem**: Content doesn't display correctly on phone

**Solutions**:
1. Test in Chrome DevTools (F12 → Device Toolbar)
2. Clear browser cache (Ctrl+Shift+Delete)
3. Verify CSS file is loading (check Network tab)
4. Check for CSS syntax errors

### Links Appear Broken

**Problem**: FTP links show as broken or won't download

**Solutions**:
1. Verify FTP server address is correct
2. Check file paths match FTP directory structure
3. Test URL in FTP client
4. Verify file exists on server

---

## 📞 Support

For issues or questions:
1. Check the main README.md
2. Review browser console for errors (F12)
3. Test FTP connectivity separately
4. Verify all configuration steps completed

---

**Last Updated**: November 2024
