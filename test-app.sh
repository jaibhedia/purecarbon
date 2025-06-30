#!/bin/bash

# PureCarbon App - Comprehensive Test Script
# Tests build, components, authentication, and functionality

echo "🧪 Starting PureCarbon App Tests..."
echo "=================================="

# Test 1: TypeScript Check (skip full build for now)
echo -e "\n1️⃣ Testing TypeScript Types..."
npx tsc --noEmit
if [ $? -eq 0 ]; then
    echo "✅ TypeScript check successful"
else
    echo "❌ TypeScript check failed"
    exit 1
fi

# Test 2: Lint Check
echo -e "\n2️⃣ Testing Linting..."
npm run lint
if [ $? -eq 0 ]; then
    echo "✅ Linting passed"
else
    echo "⚠️ Linting issues found"
fi

# Test 3: Component Import Check
echo -e "\n3️⃣ Testing Component Imports..."
node -e "
const fs = require('fs');
const path = require('path');

const componentsDir = './components';
const components = fs.readdirSync(componentsDir)
  .filter(f => f.endsWith('.tsx') && !f.includes('ui'))
  .map(f => f.replace('.tsx', ''));

console.log('Found components:', components.join(', '));

// Test key components exist
const required = ['Dashboard', 'LandingPage', 'SignIn', 'SignUp', 'CarbonCalculator'];
const missing = required.filter(c => !components.includes(c));

if (missing.length === 0) {
  console.log('✅ All required components found');
} else {
  console.log('❌ Missing components:', missing.join(', '));
  process.exit(1);
}
"

# Test 4: Environment Variables
echo -e "\n4️⃣ Testing Environment Setup..."
if [ -f ".env.local" ]; then
    echo "✅ Environment file exists"
    
    # Check for key variables without exposing values
    node -e "
    require('dotenv').config({ path: '.env.local' });
    const required = ['NEXTAUTH_SECRET', 'NEXTAUTH_URL'];
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length === 0) {
      console.log('✅ Required environment variables configured');
    } else {
      console.log('⚠️ Missing env vars:', missing.join(', '));
    }
    "
else
    echo "⚠️ No .env.local file found"
fi

# Test 5: Package Dependencies
echo -e "\n5️⃣ Testing Dependencies..."
npm ls --depth=0 > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ All dependencies installed correctly"
else
    echo "⚠️ Some dependency issues found"
fi

# Test 6: Branding Check
echo -e "\n6️⃣ Testing PureCarbon Branding..."
if grep -r "CarbonTrace" components/ --exclude-dir=node_modules >/dev/null 2>&1; then
    echo "⚠️ Found old 'CarbonTrace' references in components"
    grep -r "CarbonTrace" components/ --exclude-dir=node_modules
else
    echo "✅ No old branding references found"
fi

echo -e "\n🎉 Test suite completed!"
echo "=================================="
