# ISP Media Vault - Testing Guide

Comprehensive testing procedures to ensure the portal meets all requirements.

## ✅ Functional Testing

### F1: FTP Link Mapping

**Test**: Verify all FTP links are correctly mapped

**Steps**:
1. Open `index.html` in a text editor
2. Search for all `href="ftp://` occurrences
3. Verify each URL follows the pattern: `ftp://server/path/filename.ext`
4. Confirm paths match actual FTP directory structure

**Expected Result**: All FTP URLs are valid and accessible

**Test Command**:
```bash
grep -o 'href="ftp://[^"]*"' index.html
```

---

### F2: Download Button Functionality

**Test**: Clicking download button initiates file download

**Steps**:
1. Open portal in web browser
2. Click each "Download" button
3. Verify download starts
4. Check file name is correct (matches `download` attribute)

**Expected Result**: 
- Download starts immediately
- File name is correct
- No errors in browser console

**Test on Browsers**:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

### F3: Content Display

**Test**: All content displays with required metadata

**Steps**:
1. Open portal in browser
2. Verify each item displays:
   - File Name (in `<h3>`)
   - File Type (badge)
   - File Size
   - Upload Date
   - Description

**Expected Result**: All metadata visible and readable

**Verification**:
```bash
# Count content items
grep -c 'class="content-item"' index.html
```

---

### F4: Basic Structure

**Test**: HTML structure is valid and complete

**Steps**:
1. Validate HTML: https://validator.w3.org/
2. Upload `index.html`
3. Check for errors

**Expected Result**: No errors, only warnings (if any)

**Command Line Validation**:
```bash
# Install html5validator
pip install html5validator

# Validate
html5validator index.html
```

---

### F5: Download Attribute

**Test**: Download attribute properly set

**Steps**:
1. Open `index.html` in text editor
2. Verify each download link has `download="filename.ext"`
3. Confirm filename matches actual file

**Expected Result**: All links have correct download attribute

**Verification**:
```bash
grep 'download="' index.html | wc -l
```

---

## 🎯 User Experience Testing

### U1: Clear Branding

**Test**: ISP branding is prominent and clear

**Steps**:
1. Open portal
2. Verify logo/branding visible in header
3. Confirm company name displayed
4. Check branding consistent throughout

**Checklist**:
- [ ] Logo visible and recognizable
- [ ] Company name prominent
- [ ] Colors match ISP branding
- [ ] Professional appearance

---

### U2: Mobile Responsive

**Test**: Page displays correctly on all screen sizes

**Steps**:
1. Open in Chrome DevTools (F12)
2. Click device toolbar icon
3. Test at these breakpoints:
   - 320px (mobile)
   - 768px (tablet)
   - 1024px (desktop)
   - 1920px (large desktop)

**Expected Result**: Layout adapts smoothly, no horizontal scrolling

**Desktop Sizes to Test**:
```
Mobile:     375x667, 414x896, 320x568
Tablet:     768x1024, 810x1080
Desktop:    1024x768, 1366x768, 1920x1080
```

**Mobile Devices to Test**:
- [ ] iPhone (iOS)
- [ ] Android phone
- [ ] iPad
- [ ] Android tablet

---

### U3: Simple Navigation

**Test**: Easy navigation to homepage

**Steps**:
1. Open portal
2. Locate "Back to Homepage" button
3. Click button
4. Verify correct page opens

**Expected Result**: Button visible and functional

---

### U4: File Categories

**Test**: Content organized into logical categories

**Steps**:
1. Open portal
2. Verify categories present:
   - [ ] Software & Tools
   - [ ] Documentation & Guides
   - [ ] Media & Entertainment
   - [ ] Local Content & Resources
3. Confirm items grouped correctly

**Expected Result**: Clear category headings, logical organization

---

### U5: No Manual Input

**Test**: No credentials required

**Steps**:
1. Open portal
2. Verify no login form
3. Verify no username/password fields
4. Confirm direct download possible

**Expected Result**: No authentication required

---

## 🔧 Technical Testing

### N1: Technology Stack

**Test**: Only HTML5 and CSS3 used

**Steps**:
1. Open `index.html` in text editor
2. Verify no external frameworks (React, Vue, Angular)
3. Check `styles.css` for vendor prefixes
4. Confirm minimal JavaScript (if any)

**Expected Result**: Pure HTML5 and CSS3

**Verification**:
```bash
# Check for JavaScript
grep -c '<script' index.html

# Check CSS file size
wc -c styles.css
```

---

### N2: Cross-Browser Compatibility

**Test**: Works on latest browser versions

**Browsers to Test**:
- [ ] Chrome 120+
- [ ] Firefox 121+
- [ ] Safari 17+
- [ ] Edge 120+

**Test Procedure**:
1. Open portal in each browser
2. Verify layout correct
3. Test all download buttons
4. Check for console errors (F12)

**Expected Result**: Consistent appearance and functionality

---

### N3: Security

**Test**: No sensitive data exposed

**Steps**:
1. Open DevTools (F12)
2. Check Network tab
3. Verify no credentials in URLs
4. Check for mixed content warnings
5. Verify HTTPS (if applicable)

**Expected Result**: No security warnings

**Security Checklist**:
- [ ] No hardcoded passwords
- [ ] No API keys exposed
- [ ] HTTPS enabled (if public)
- [ ] Security headers present
- [ ] No console errors

---

### N4: Content Update Mechanism

**Test**: Content can be updated

**Steps**:
1. Edit `index.html`
2. Add/modify/remove content item
3. Save file
4. Refresh browser
5. Verify changes visible

**Expected Result**: Changes immediately visible

---

## 📊 Performance Testing

### Page Load Time

**Test**: Page loads in under 2 seconds

**Method 1: Browser DevTools**:
1. Open DevTools (F12)
2. Go to Network tab
3. Reload page
4. Check "Finish" time

**Method 2: Google PageSpeed**:
1. Deploy to staging server
2. Visit: https://pagespeed.web.dev/
3. Enter URL
4. Check metrics:
   - FCP < 1.5s
   - LCP < 2.5s
   - CLS < 0.1

**Method 3: Command Line**:
```bash
# Using curl
time curl -o /dev/null -s -w '%{time_total}' http://localhost:8000/

# Using wget
wget --spider -O /dev/null http://localhost:8000/ 2>&1 | grep 'Time'
```

**Expected Result**: < 2 seconds total load time

---

### File Sizes

**Test**: Verify file sizes are optimized

```bash
# Check HTML size
wc -c index.html

# Check CSS size
wc -c styles.css

# Total size
du -sh .
```

**Expected Result**:
- HTML: < 50 KB
- CSS: < 30 KB
- Total: < 100 KB

---

## ♿ Accessibility Testing

### WCAG 2.1 Level A Compliance

#### Color Contrast

**Test**: Text meets minimum contrast ratio

**Steps**:
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Run Accessibility audit
4. Check color contrast scores

**Expected Result**: All text has 4.5:1 contrast ratio minimum

**Online Tool**: https://webaim.org/resources/contrastchecker/

---

#### Keyboard Navigation

**Test**: All interactive elements accessible via keyboard

**Steps**:
1. Open portal
2. Press Tab key repeatedly
3. Verify focus indicator visible
4. Confirm all buttons/links reachable
5. Press Enter to activate
6. Verify no keyboard traps

**Expected Result**: 
- All elements accessible
- Focus indicators visible
- No keyboard traps

**Keyboard Shortcuts**:
- Tab: Next element
- Shift+Tab: Previous element
- Enter: Activate button/link
- Space: Activate button

---

#### Screen Reader Testing

**Test**: Content readable by screen readers

**Tools**:
- Windows: NVDA (free)
- Mac: VoiceOver (built-in)
- Online: WAVE (https://wave.webaim.org/)

**Steps**:
1. Enable screen reader
2. Navigate through page
3. Verify all content readable
4. Check headings announced correctly
5. Verify link text descriptive

**Expected Result**: All content accessible to screen readers

---

#### Semantic HTML

**Test**: Proper use of semantic elements

**Verification**:
```bash
# Check for semantic elements
grep -E '<(header|main|footer|article|section|nav)' index.html
```

**Expected Result**: Proper semantic structure present

---

#### Focus Indicators

**Test**: Focus indicators visible for keyboard users

**Steps**:
1. Press Tab key
2. Verify blue outline appears around focused element
3. Confirm outline visible on all interactive elements

**Expected Result**: Clear focus indicators on all elements

---

## 🧪 Browser-Specific Testing

### Chrome/Edge (Chromium)

```
Test:
- [ ] Layout correct
- [ ] Colors accurate
- [ ] Fonts render properly
- [ ] No console errors
- [ ] DevTools Lighthouse score > 90
```

### Firefox

```
Test:
- [ ] Layout correct
- [ ] CSS Grid works
- [ ] Flexbox works
- [ ] No console errors
- [ ] Performance acceptable
```

### Safari (Mac/iOS)

```
Test:
- [ ] Layout correct
- [ ] Touch interactions work
- [ ] Fonts render properly
- [ ] No console errors
- [ ] Mobile viewport correct
```

### Edge (Legacy)

```
Test:
- [ ] Basic functionality works
- [ ] Layout acceptable
- [ ] Downloads work
- [ ] No critical errors
```

---

## 📱 Mobile-Specific Testing

### Touch Interactions

**Test**: Touch targets are adequate size

**Steps**:
1. Open on mobile device
2. Attempt to tap each button
3. Verify buttons are 44x44px minimum
4. Confirm no accidental taps

**Expected Result**: Easy to tap, no misclicks

---

### Viewport

**Test**: Viewport meta tag correct

**Verification**:
```bash
grep 'viewport' index.html
```

**Expected Output**:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

### Responsive Images

**Test**: Images scale properly

**Steps**:
1. Test at different screen sizes
2. Verify images don't overflow
3. Check aspect ratios maintained

**Expected Result**: Images responsive and properly scaled

---

## 🔐 Security Testing

### HTML Validation

```bash
# Validate HTML
html5validator index.html

# Check for common issues
grep -i 'onclick\|onerror\|onload' index.html
```

**Expected Result**: No validation errors, no inline event handlers

---

### Link Validation

**Test**: All links are safe and valid

**Steps**:
1. Check all FTP links
2. Verify no javascript: links
3. Confirm no data: URIs
4. Check external links (if any)

**Expected Result**: All links are safe and valid

---

### Content Security

**Test**: No sensitive data exposed

**Steps**:
1. View page source (Ctrl+U)
2. Search for: password, api_key, token, secret
3. Verify no credentials found

**Expected Result**: No sensitive data in HTML

---

## 📋 Testing Checklist

### Pre-Launch

- [ ] All FTP links functional
- [ ] Page loads < 2 seconds
- [ ] Mobile responsive (320px, 768px, 1920px)
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast adequate
- [ ] No console errors
- [ ] All browsers tested
- [ ] Security audit passed
- [ ] Accessibility audit passed

### Post-Launch

- [ ] Monitor analytics
- [ ] Track download clicks
- [ ] Review user feedback
- [ ] Check error logs
- [ ] Verify FTP availability
- [ ] Test from different networks
- [ ] Monitor performance metrics

---

## 🚀 Automated Testing

### HTML Validation Script

```bash
#!/bin/bash
# validate.sh

echo "Validating HTML..."
html5validator index.html

echo "Checking for common issues..."
grep -i 'onclick\|onerror\|onload' index.html && echo "WARNING: Inline event handlers found"

echo "Checking FTP links..."
grep -o 'href="ftp://[^"]*"' index.html | wc -l

echo "Checking CSS..."
wc -c styles.css

echo "Validation complete!"
```

### Performance Testing Script

```bash
#!/bin/bash
# performance.sh

echo "Testing page load time..."
time curl -o /dev/null -s http://localhost:8000/

echo "Checking file sizes..."
du -h index.html styles.css

echo "Performance test complete!"
```

---

## 📞 Test Results Template

```
Test Date: ___________
Tester: ___________
Browser: ___________
Device: ___________

Functional Tests:
- FTP Links: [ ] Pass [ ] Fail
- Download Buttons: [ ] Pass [ ] Fail
- Content Display: [ ] Pass [ ] Fail
- HTML Structure: [ ] Pass [ ] Fail

UX Tests:
- Branding: [ ] Pass [ ] Fail
- Mobile Responsive: [ ] Pass [ ] Fail
- Navigation: [ ] Pass [ ] Fail
- Categories: [ ] Pass [ ] Fail

Performance:
- Load Time: _____ seconds
- Lighthouse Score: _____
- File Size: _____ KB

Accessibility:
- Keyboard Nav: [ ] Pass [ ] Fail
- Screen Reader: [ ] Pass [ ] Fail
- Color Contrast: [ ] Pass [ ] Fail
- Focus Indicators: [ ] Pass [ ] Fail

Issues Found:
1. ___________
2. ___________
3. ___________

Notes:
___________

Overall Status: [ ] Pass [ ] Fail
```

---

**Last Updated**: November 2024
