// pages/api/invoices.js
import fetch from 'isomorphic-unfetch';

export default async function handler(req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) {
  try {
    const response = await fetch('http://localhost:1337/api/invoices?populate=invoice');
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ message: 'Error fetching invoices' });
  }
}
