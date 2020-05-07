<?php
namespace Domain\hms\Model;
require_once __DIR__ . "/Person.php";

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity
 */
class MedicalStaff extends Person {
    public function __construct() {
        $this->prescriptions = new ArrayCollection();
    }

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    private $id;

    /**
     * @ORM\Column(length=30)
     */
    private $role;

    /**
     * @ORM\Column(type="integer")
     */
    private $yearOfExperience;


    /**
     * @ORM\ManyToOne(targetEntity="Room", inversedBy="assignedStaff")
     * @ORM\JoinColumns({
     *      @ORM\JoinColumn(name="assignRoomNo", referencedColumnName="number"),
     *      @ORM\JoinColumn(name="assignRoomType", referencedColumnName="type"),
     * })
     */
    private $assignedRoom;

    /**
     * @ORM\Column(length=30)
     */
    private $specialty;

    /**
     * @ORM\OneToMany(targetEntity="Prescription", mappedBy="prescribedBy")
     */
    private $prescriptions;

    /**
     * Get the value of id
     */ 
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get the value of yearOfExperience
     */ 
    public function getYearOfExperience()
    {
        return $this->yearOfExperience;
    }

    /**
     * Set the value of yearOfExperience
     *
     * @return  self
     */ 
    public function setYearOfExperience($yearOfExperience)
    {
        $this->yearOfExperience = $yearOfExperience;

        return $this;
    }

    /**
     * Get })
     */ 
    public function getAssignedRoom()
    {
        return $this->assignedRoom;
    }

    /**
     * Set })
     *
     * @return  self
     */ 
    public function setAssignedRoom($assignedRoom)
    {
        $this->assignedRoom = $assignedRoom;

        return $this;
    }

    /**
     * Get the value of prescriptions
     */ 
    public function getPrescriptions()
    {
        return $this->prescriptions;
    }

    /**
     * Set the value of prescriptions
     *
     * @return  self
     */ 
    public function setPrescriptions($prescriptions)
    {
        $this->prescriptions = $prescriptions;

        return $this;
    }

    /**
     * Get the value of specialty
     */ 
    public function getSpecialty()
    {
        return $this->specialty;
    }

    /**
     * Set the value of specialty
     *
     * @return  self
     */ 
    public function setSpecialty($specialty)
    {
        $this->specialty = $specialty;

        return $this;
    }
}