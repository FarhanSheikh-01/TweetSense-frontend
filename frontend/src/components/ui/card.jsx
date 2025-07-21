// src/components/ui/card.jsx
export function Card({ className = "", children }) {
  return (
    <div className={`rounded-2xl bg-white p-6 shadow-md ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ className = "", children }) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
}

export function CardDescription({ className = "", children }) {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
}

export function CardContent({ className = "", children }) {
  return <div className={`mb-2 ${className}`}>{children}</div>;
}

export function CardFooter({ className = "", children }) {
  return <div className={`pt-4 mt-4 border-t border-gray-200 ${className}`}>{children}</div>;
}
