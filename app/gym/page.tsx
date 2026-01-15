"use client";

import { useEffect, useState } from "react";

interface Person {
  name: string;
  days: string[];
}

interface GymData {
  ok: boolean;
  people: Person[];
}

const PERSON_COLORS: Record<string, string> = {
  Sam: "#16a34a",
  Mom: "#db2777",
  Martin: "#2563eb",
  Lexi: "#9333ea",
  Dad: "#d97706",
};

export default function GymPage() {
  const [data, setData] = useState<GymData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gym")
      .then((res) => res.json())
      .then((data: GymData) => {
        setData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="page">
        <p>Loading...</p>
        <style jsx>{styles}</style>
      </div>
    );
  }

  if (!data || !data.ok) {
    return (
      <div className="page">
        <p>Failed to load</p>
        <style jsx>{styles}</style>
      </div>
    );
  }

  // Build date -> people map
  const dateMap: Record<string, string[]> = {};
  data.people.forEach((person) => {
    person.days.forEach((day) => {
      if (!dateMap[day]) dateMap[day] = [];
      dateMap[day].push(person.name);
    });
  });

  // Get all months that have data
  const allDates = Object.keys(dateMap).sort();
  const months = getMonthsFromDates(allDates);

  // Sort people by total count (global ranking)
  const sorted = [...data.people].sort((a, b) => b.days.length - a.days.length);

  return (
    <div className="page">
      <h1>Family Gym Tracker</h1>
      <br/>
      {/* Global Leaderboard */}
      <div className="section-label">All Time</div>
      <div className="leaderboard">
        {sorted.map((person, i) => (
          <div key={person.name} className="leader">
            <span className="rank">{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`}</span>
            <span className="name" style={{ color: PERSON_COLORS[person.name] }}>
              {person.name}
            </span>
            <span className="count">{person.days.length}</span>
          </div>
        ))}
      </div>

      {/* Calendars */}
      {months.map((month) => (
        <MonthCalendar
          key={month}
          month={month}
          dateMap={dateMap}
          people={data.people}
        />
      ))}

      <style jsx>{styles}</style>
    </div>
  );
}

function MonthCalendar({
  month,
  dateMap,
  people,
}: {
  month: string;
  dateMap: Record<string, string[]>;
  people: Person[];
}) {
  const [year, monthNum] = month.split("-").map(Number);
  const monthName = new Date(year, monthNum - 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Calculate monthly counts
  const monthlyCounts: Record<string, number> = {};
  people.forEach((p) => {
    monthlyCounts[p.name] = p.days.filter((d) => d.startsWith(month)).length;
  });

  // Sort by monthly count
  const monthlyRanking = Object.entries(monthlyCounts)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);

  const firstDay = new Date(year, monthNum - 1, 1);
  const lastDay = new Date(year, monthNum, 0);
  const startPadding = firstDay.getDay();
  const totalDays = lastDay.getDate();

  const days = [];

  for (let i = 0; i < startPadding; i++) {
    days.push(<div key={`pad-${i}`} className="day empty" />);
  }

  for (let d = 1; d <= totalDays; d++) {
    const dateStr = `${year}-${String(monthNum).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const peopleOnDay = dateMap[dateStr] || [];

    days.push(
      <div key={dateStr} className={`day ${peopleOnDay.length > 0 ? "has-data" : ""}`}>
        <span className="day-num">{d}</span>
        {peopleOnDay.length > 0 && (
          <div className="names">
            {peopleOnDay.map((name) => (
              <span
                key={name}
                className="person"
                style={{ color: PERSON_COLORS[name] }}
              >
                {name}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="month">
      <div className="month-header">
        <h2>{monthName}</h2>
        <div className="monthly-ranking">
          {monthlyRanking.map(([name, count], i) => (
            <span key={name} className="monthly-person">
              <span className="monthly-rank">
                {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`}
              </span>
              <span style={{ color: PERSON_COLORS[name] }}>{name}</span>
              <span className="monthly-count">{count}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="weekdays">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="weekday">{d}</div>
        ))}
      </div>
      <div className="grid">{days}</div>
      <style jsx>{styles}</style>
    </div>
  );
}

function getMonthsFromDates(dates: string[]): string[] {
  const months = new Set<string>();
  dates.forEach((d) => {
    const [y, m] = d.split("-");
    months.add(`${y}-${m}`);
  });
  return Array.from(months).sort().reverse();
}

const styles = `
  .page {
    max-width: 1000px;
    margin: 0 auto;
    padding: 40px 24px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  h1 {
    font-size: 32px;
    font-weight: 700;
    margin: 0;
    color: #111;
  }

  .subtitle {
    font-size: 16px;
    color: #666;
    margin: 4px 0 32px;
  }

  .section-label {
    font-size: 12px;
    font-weight: 600;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
  }

  .leaderboard {
    display: flex;
    gap: 28px;
    margin-bottom: 48px;
    flex-wrap: wrap;
  }

  .leader {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .rank {
    font-size: 18px;
  }

  .name {
    font-weight: 600;
    font-size: 16px;
  }

  .count {
    color: #666;
    font-size: 15px;
  }

  .month {
    margin-bottom: 56px;
  }

  .month-header {
    display: flex;
    align-items: baseline;
    gap: 20px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }

  h2 {
    font-size: 22px;
    font-weight: 600;
    margin: 0;
    color: #222;
  }

  .monthly-ranking {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .monthly-person {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
  }

  .monthly-rank {
    font-size: 14px;
  }

  .monthly-count {
    color: #888;
    font-size: 13px;
  }

  .weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1px;
    margin-bottom: 1px;
  }

  .weekday {
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    color: #999;
    text-transform: uppercase;
    padding: 10px 0;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1px;
    background: #e0e0e0;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
  }

  .day {
    background: #fff;
    min-height: 85px;
    padding: 8px;
    display: flex;
    flex-direction: column;
  }

  .day.empty {
    background: #f8f8f8;
  }

  .day-num {
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }

  .names {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-top: 6px;
  }

  .person {
    font-size: 12px;
    font-weight: 600;
  }
`;
