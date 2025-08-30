# Repartito

A vanilla JavaScript expense tracking app for friend groups, similar to Splitwise but with additional features tailored to users from Argentina, including inflation tracking and local currency considerations.

## 🚀 Features

- **Expense Tracking**: Easily add, edit, and categorize expenses
- **Group Management**: Create and manage friend groups for shared expenses
- **Split Calculations**: Multiple splitting options (equal, percentage, custom amounts)
- **Argentina-Specific Features**:
  - Inflation tracking and adjustment
  - Local currency (ARS) support
  - Historical expense analysis with inflation context
- **Debt Settlement**: Track who owes what to whom
- **Expense History**: View detailed transaction history
- **Responsive Design**: Works on desktop and mobile devices

## 📋 Prerequisites

This is a vanilla JavaScript project that runs directly in the browser. No package manager or build tools are required.

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation needed

## 🛠️ Installation

1. Clone the repository
```bash
git clone https://github.com/username/repartito.git
cd repartito
```

2. Open the project in your browser
   - Simply open `src/index.html` in your web browser
   - Or use a local development server if you prefer:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Python 2
     python -m SimpleHTTPServer 8000
     
     # Using Node.js (if you have it installed)
     npx http-server
     ```

3. Navigate to `http://localhost:8000` in your browser

## 🎯 Usage

**Repartito** is designed to be simple and intuitive:

1. **Create a Group**: Start by creating a new group for your friends
2. **Add Members**: Invite friends to join your expense group
3. **Track Expenses**: Add expenses with descriptions, amounts, and categories
4. **Split Bills**: Choose how to split expenses among group members
5. **Monitor Debts**: See who owes what to whom
6. **Track Inflation**: View how expenses change over time with inflation adjustments

The app automatically handles calculations and provides a clear overview of group finances.

## 🧪 Testing

Since this is a vanilla JavaScript project, testing is done manually in the browser:

1. Open the app in your browser
2. Test all major features:
   - Group creation and management
   - Adding and editing expenses
   - Split calculations
   - Debt tracking
   - Inflation adjustments
3. Test on different devices and browsers for responsiveness

## 📦 Building for Production

This vanilla JavaScript project is ready for production without any build process:

1. **Deploy**: Simply upload the `src/` folder to your web server
2. **Hosting**: Works on any static hosting service (GitHub Pages, Netlify, Vercel, etc.)
3. **No Build Required**: All files are already optimized for production use

For better performance, consider:
- Minifying CSS and JavaScript files (optional)
- Enabling gzip compression on your server
- Using a CDN for better global performance

## 🏗️ Project Structure

```
repartito/
├── src/
│   ├── index.html          # Main HTML file
│   └── main.js            # Core JavaScript functionality
├── README.md              # This file
└── ...                    # Additional project files
```

**Key Components:**
- **HTML**: Structure and layout of the expense tracking interface
- **JavaScript**: Core logic for expense management, calculations, and data handling
- **CSS**: Styling and responsive design (if separate CSS files are added)

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0) - see the [LICENSE.md](LICENSE.md) file for details

## 👥 Authors

- **Sebastian** - *Initial work* - [SebastianMestre](https://github.com/SebastianMestre)



## 📞 Contact

Sebastian - [@SebastianMestre](https://github.com/SebastianMestre)

Project Link: [https://github.com/SebastianMestre/repartito](https://github.com/SebastianMestre/repartito)
