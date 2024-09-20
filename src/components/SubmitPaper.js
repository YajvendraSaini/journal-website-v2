import React from 'react';

function SubmitPaper() {
  return (
    <div className="section">
      <h2>Submit Your Paper</h2>
      <form action="/upload" method="post" enctype="multipart/form-data">
        <label htmlFor="file">Upload your paper (PDF or Word):</label>
        <input type="file" id="file" name="file" accept=".pdf,.doc,.docx" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SubmitPaper;