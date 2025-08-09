## 📄 Documentation

### Assignment Overview
This project is built as part of the **Full-Stack Developer Intern Assignment** for **WealthManager.online**.  
The goal is to create a **Portfolio Analytics Dashboard** that provides investors with a detailed and interactive view of their investment portfolio.

---

### 📌 Backend Requirements

A **Portfolio Data Service API** with 4 core endpoints:

1. **GET `/api/portfolio/holdings`**  
   Returns the complete list of user's stock investments with calculated:
   - Current value  
   - Absolute gain/loss  
   - Gain/loss percentage  

2. **GET `/api/portfolio/allocation`**  
   Returns asset allocation by:
   - **Sector** (e.g., Technology, Energy, Banking, etc.)  
   - **Market Cap** (Large, Mid, Small)

3. **GET `/api/portfolio/performance`**  
   Returns:
   - Historical performance vs benchmarks (Nifty 50, Gold)  
   - Returns for 1 month, 3 months, and 1 year

4. **GET `/api/portfolio/summary`**  
   Returns key portfolio metrics:
   - Total value, invested amount, total gain/loss  
   - Top and worst performers  
   - Diversification score and risk level

**Additional Backend Requirements:**
- Data calculations (gain/loss, percentages)  
- Error handling with proper HTTP status codes  
- Validation for edge cases and invalid requests  
- Clean, well-commented code

---

### 📌 Frontend Requirements

An **interactive portfolio dashboard** with the following sections:

1. **Portfolio Overview Cards**  
   - Total value, gain/loss, % performance, number of holdings

2. **Asset Allocation Visualizations**  
   - Sector breakdown (pie/donut chart)  
   - Market cap distribution (bar/pie chart)  
   - Hover effects for exact values and percentages

3. **Holdings Table/Grid**  
   - Sortable, searchable  
   - Color-coded for gains/losses  
   - Fully responsive

4. **Performance Comparison Chart**  
   - Timeline chart for portfolio vs Nifty 50 vs Gold  
   - Hover to view exact values  
   - Shows return percentages

5. **Top Performers Section**  
   - Highlight best and worst performing stocks  
   - Show diversification score and risk level

**Additional Frontend Requirements:**
- Responsive design for mobile  
- Interactive elements and hover effects  
- Loading states and user-friendly error handling

---

### 📌 Technical Freedom
- Any technology stack may be used  
- AI tools are encouraged to speed up development  
- Documentation should specify:
  - AI tools used and how  
  - Which code was AI-generated vs hand-written  
  - How AI helped solve specific challenges

---

### 📌 Deliverables
1. **Complete Working Application**
   - Live backend API  
   - Live frontend dashboard  
   - Organized GitHub repository

2. **Documentation**
   - Comprehensive README (this file)

3. **Working Demo**
   - Portfolio data displayed correctly  
   - All charts functional  
   - Responsive and interactive UI  
