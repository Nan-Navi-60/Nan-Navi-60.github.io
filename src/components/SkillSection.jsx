export default function SkillSection({ skills }) {
  
  return (
    <div className="profile-area-skill bg-navy">
      {skills.map((skill, index) => (
        <span key={index} className="font-icon white">
          {skill}
        </span>
      ))}
    </div>
  );
}