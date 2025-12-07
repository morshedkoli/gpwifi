# ISP Media Vault - Deployment Guide

Step-by-step instructions for deploying the ISP Media Vault portal to production.

## 📋 Pre-Deployment Verification

### 1. Configuration Verification

- [ ] FTP server address updated in all links
- [ ] ISP branding customized (logo, name, colors)
- [ ] All footer links point to correct URLs
- [ ] Contact information is accurate
- [ ] File sizes and dates are current

### 2. Functionality Testing

**Desktop Testing**:
```
Browser: Chrome, Firefox, Safari, Edge
Screen Size: 1920x1080, 1366x768, 1024x768
Tests:
  - All download buttons functional
  - Links open/download correctly
  - Page loads in < 2 seconds
  - No console errors (F12)
  - Keyboard navigation works (Tab key)
```

**Mobile Testing**:
```
Devices: iPhone, Android phone, iPad
Screen Sizes: 375x667, 414x896, 768x1024
Tests:
  - Layout responsive and readable
  - Download buttons accessible
  - Touch targets adequate (44x44px minimum)
  - No horizontal scrolling
  - Fast load time on 4G
```

**Accessibility Testing**:
```
- Keyboard navigation (Tab, Enter, Shift+Tab)
- Screen reader (NVDA, VoiceOver)
- Color contrast (WCAG AA minimum 4.5:1)
- Focus indicators visible
- No keyboard traps
```

### 3. Network Verification

```bash
# Test FTP connectivity
ping media.isp.local
ftp media.isp.local

# Verify FTP paths
# List directory contents to confirm file locations
```

### 4. Performance Testing

Use Google PageSpeed Insights:
1. Deploy to staging server
2. Visit: https://pagespeed.web.dev/
3. Enter staging URL
4. Verify:
   - First Contentful Paint < 1.5s
   - Largest Contentful Paint < 2.5s
   - Cumulative Layout Shift < 0.1
   - Performance score > 90

---

## 🚀 Deployment Options

### Option A: Apache Web Server (Linux/Unix)

#### Prerequisites
- Apache 2.4+
- SSH/Terminal access
- Root or sudo privileges

#### Steps

1. **Connect to server**:
   ```bash
   ssh user@your-server.com
   ```

2. **Create directory**:
   ```bash
   sudo mkdir -p /var/www/html/ispdownloader
   sudo chown -R www-data:www-data /var/www/html/ispdownloader
   ```

3. **Upload files**:
   ```bash
   scp index.html user@your-server.com:/var/www/html/ispdownloader/
   scp styles.css user@your-server.com:/var/www/html/ispdownloader/
   ```

4. **Set permissions**:
   ```bash
   sudo chmod 755 /var/www/html/ispdownloader
   sudo chmod 644 /var/www/html/ispdownloader/*
   ```

5. **Enable site** (if using virtual hosts):
   ```bash
   sudo a2ensite ispdownloader
   sudo systemctl reload apache2
   ```

6. **Verify**:
   ```
   http://your-server.com/ispdownloader/
   ```

---

### Option B: Nginx Web Server (Linux/Unix)

#### Prerequisites
- Nginx 1.14+
- SSH/Terminal access
- Root or sudo privileges

#### Steps

1. **Connect to server**:
   ```bash
   ssh user@your-server.com
   ```

2. **Create directory**:
   ```bash
   sudo mkdir -p /usr/share/nginx/html/ispdownloader
   sudo chown -R nginx:nginx /usr/share/nginx/html/ispdownloader
   ```

3. **Upload files**:
   ```bash
   scp index.html user@your-server.com:/usr/share/nginx/html/ispdownloader/
   scp styles.css user@your-server.com:/usr/share/nginx/html/ispdownloader/
   ```

4. **Create Nginx config** (`/etc/nginx/sites-available/ispdownloader`):
   ```nginx
   server {
       listen 80;
       listen [::]:80;
       
       server_name media.yourisp.com;
       root /usr/share/nginx/html/ispdownloader;
       index index.html;
       
       # Cache static assets
       location ~* \.(css|js)$ {
           expires 30d;
           add_header Cache-Control "public, immutable";
       }
       
       # Security headers
       add_header X-Frame-Options "SAMEORIGIN" always;
       add_header X-Content-Type-Options "nosniff" always;
       add_header X-XSS-Protection "1; mode=block" always;
       add_header Referrer-Policy "no-referrer-when-downgrade" always;
       
       # Gzip compression
       gzip on;
       gzip_types text/plain text/css text/xml text/javascript;
   }
   ```

5. **Enable site**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/ispdownloader /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

6. **Verify**:
   ```
   http://media.yourisp.com/
   ```

---

### Option C: IIS Web Server (Windows)

#### Prerequisites
- IIS 8.0+
- Administrator access
- Windows Server

#### Steps

1. **Create directory**:
   ```
   C:\inetpub\wwwroot\ispdownloader\
   ```

2. **Copy files**:
   - Copy `index.html` to `C:\inetpub\wwwroot\ispdownloader\`
   - Copy `styles.css` to `C:\inetpub\wwwroot\ispdownloader\`

3. **Open IIS Manager**:
   - Press `Win+R`, type `inetmgr`, press Enter

4. **Create Application**:
   - Right-click "Sites" → "Add Website"
   - Site name: `ISP Download Portal`
   - Physical path: `C:\inetpub\wwwroot\ispdownloader`
   - Binding: `http`, IP: `All Unassigned`, Port: `80`
   - Host name: `media.yourisp.com` (optional)

5. **Set Default Document**:
   - Select the site
   - Double-click "Default Document"
   - Ensure `index.html` is at the top of the list

6. **Set MIME Types**:
   - Double-click "MIME Types"
   - Verify `.css` is mapped to `text/css`

7. **Verify**:
   ```
   http://localhost/ispdownloader/
   ```

---

### Option D: Cloud Hosting (Netlify, Vercel, GitHub Pages)

#### Netlify Deployment

1. **Create Netlify account**: https://netlify.com

2. **Connect repository**:
   - Push files to GitHub/GitLab
   - Connect repository to Netlify
   - Build command: (leave empty)
   - Publish directory: `.` (root)

3. **Configure**:
   - Set custom domain
   - Enable HTTPS (automatic)

4. **Deploy**:
   - Netlify automatically deploys on push

#### GitHub Pages Deployment

1. **Create repository**: `ispdownloader`

2. **Push files**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/ispdownloader.git
   git push -u origin main
   ```

3. **Enable Pages**:
   - Go to Settings → Pages
   - Source: `main` branch
   - Folder: `/ (root)`

4. **Access**:
   ```
   https://yourusername.github.io/ispdownloader/
   ```

---

## 🔒 Security Hardening

### HTTPS Configuration

#### Let's Encrypt (Free SSL)

**For Apache**:
```bash
sudo apt install certbot python3-certbot-apache
sudo certbot --apache -d media.yourisp.com
```

**For Nginx**:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d media.yourisp.com
```

**For IIS**:
1. Use IIS Certificate Binding
2. Or use Let's Encrypt with Certbot for Windows

### Security Headers

Add to your web server configuration:

**Apache** (`.htaccess`):
```apache
Header set X-Frame-Options "SAMEORIGIN"
Header set X-Content-Type-Options "nosniff"
Header set X-XSS-Protection "1; mode=block"
Header set Referrer-Policy "no-referrer-when-downgrade"
Header set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```

**Nginx**:
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

### Firewall Rules

**Allow only necessary ports**:
```bash
# Allow HTTP
sudo ufw allow 80/tcp

# Allow HTTPS
sudo ufw allow 443/tcp

# Allow SSH (for administration)
sudo ufw allow 22/tcp

# Deny all other incoming
sudo ufw default deny incoming
sudo ufw enable
```

---

## 📊 Post-Deployment Verification

### 1. Functionality Check

```bash
# Test page loads
curl -I http://media.yourisp.com/

# Verify CSS loads
curl -I http://media.yourisp.com/styles.css

# Check response time
time curl http://media.yourisp.com/ > /dev/null
```

### 2. Accessibility Check

- [ ] Page passes WAVE accessibility audit
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast adequate

### 3. Performance Check

- [ ] Page Speed Insights score > 90
- [ ] Load time < 2 seconds
- [ ] No 404 errors in console
- [ ] CSS and HTML minified (optional)

### 4. Security Check

- [ ] HTTPS enabled (if public)
- [ ] Security headers present
- [ ] No sensitive data in HTML
- [ ] FTP credentials not exposed

### 5. Cross-Browser Check

| Browser | Desktop | Mobile | Status |
|---------|---------|--------|--------|
| Chrome | ✓ | ✓ | |
| Firefox | ✓ | ✓ | |
| Safari | ✓ | ✓ | |
| Edge | ✓ | ✓ | |

---

## 🔄 Maintenance Schedule

### Daily
- Monitor FTP server availability
- Check error logs

### Weekly
- Verify all download links functional
- Review analytics

### Monthly
- Update file sizes and dates
- Test from different networks
- Review user feedback

### Quarterly
- Security audit
- Performance review
- Browser compatibility testing

### Annually
- Full accessibility audit
- Update dependencies (if any)
- Refresh content

---

## 🆘 Troubleshooting Deployment

### Issue: Page shows 404 error

**Solution**:
1. Verify files uploaded to correct directory
2. Check file permissions (755 for directories, 644 for files)
3. Verify web server is running
4. Check web server configuration

### Issue: CSS not loading

**Solution**:
1. Verify `styles.css` file exists
2. Check file permissions
3. Verify correct path in `index.html`
4. Clear browser cache (Ctrl+Shift+Delete)

### Issue: Downloads don't work

**Solution**:
1. Verify FTP server is accessible
2. Test FTP URL in file manager
3. Check firewall allows FTP (port 21)
4. Verify anonymous access enabled

### Issue: Page loads slowly

**Solution**:
1. Check network connectivity
2. Monitor server CPU/memory usage
3. Enable gzip compression
4. Enable browser caching

### Issue: Mobile layout broken

**Solution**:
1. Test in Chrome DevTools device emulation
2. Clear browser cache
3. Verify viewport meta tag present
4. Check CSS media queries

---

## 📞 Rollback Procedure

If issues occur after deployment:

1. **Backup current files**:
   ```bash
   cp -r /var/www/html/ispdownloader /var/www/html/ispdownloader.backup
   ```

2. **Restore previous version**:
   ```bash
   rm -rf /var/www/html/ispdownloader
   cp -r /var/www/html/ispdownloader.backup /var/www/html/ispdownloader
   ```

3. **Restart web server**:
   ```bash
   sudo systemctl restart apache2  # Apache
   sudo systemctl restart nginx    # Nginx
   ```

4. **Verify**:
   ```
   http://media.yourisp.com/
   ```

---

## 📝 Deployment Checklist

- [ ] All configuration steps completed
- [ ] Files tested locally
- [ ] FTP server verified accessible
- [ ] Web server configured
- [ ] Files uploaded to correct location
- [ ] Permissions set correctly
- [ ] HTTPS enabled (if public)
- [ ] Security headers configured
- [ ] Firewall rules updated
- [ ] Page loads correctly
- [ ] All links functional
- [ ] Mobile layout responsive
- [ ] Performance acceptable
- [ ] Accessibility verified
- [ ] Analytics configured (optional)
- [ ] Monitoring enabled
- [ ] Backup created
- [ ] Documentation updated

---

**Deployment Status**: Ready for Production  
**Last Updated**: November 2024
