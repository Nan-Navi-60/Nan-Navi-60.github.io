export default function SkillSection() {
  const skills = [
    "PhotoShop", "Illustrator", "AdobeXD", "SpringBoot", 
    "MySQL", "JAVA", "HTML", "CSS", "JavaScript", "BootStrap"
  ];

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