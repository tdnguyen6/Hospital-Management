<?php
namespace Domain\hms\Model;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class Room
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     */
    private $number;

    /**
     * @ORM\Id
     * @ORM\Column(length=50)
     */
    private $type;

    /**
     * @ORM\ManyToOne(targetEntity="MedicalService", inversedBy="locations")
     */
    private $medicalService;

    /**
     * @ORM\OneToMany(targetEntity="MedicalStaff", mappedBy="assignedRoom")
     */
    private $assignedStaffs;


    /**
     * @ORM\Column(type="integer")
     */
    private $noOfStaffs;

    public function __construct()
    {
        $this->assignStaffs = new ArrayCollection();
    }

    /**
     * Get the value of number
     */ 
    public function getNumber()
    {
        return $this->number;
    }

    /**
     * Set the value of number
     *
     * @return  self
     */ 
    public function setNumber($number)
    {
        $this->number = $number;

        return $this;
    }

    /**
     * Get the value of assignedStaffs
     */ 
    public function getAssignedStaffs()
    {
        return $this->assignedStaffs;
    }

    /**
     * Set the value of assignedStaffs
     *
     * @return  self
     */ 
    public function setAssignedStaffs($assignedStaffs)
    {
        $this->assignedStaffs = $assignedStaffs;

        return $this;
    }

    /**
     * Get the value of medicalService
     */ 
    public function getMedicalService()
    {
        return $this->medicalService;
    }

    /**
     * Set the value of medicalService
     *
     * @return  self
     */ 
    public function setMedicalService($medicalService)
    {
        $this->medicalService = $medicalService;

        return $this;
    }

    /**
     * Get the value of noOfStaffs
     */ 
    public function getNoOfStaffs()
    {
        return $this->noOfStaffs;
    }

    /**
     * Set the value of noOfStaffs
     *
     * @return  self
     */ 
    public function setNoOfStaffs($noOfStaffs)
    {
        $this->noOfStaffs = $noOfStaffs;

        return $this;
    }

    /**
     * Get the value of type
     */ 
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set the value of type
     *
     * @return  self
     */ 
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }
}
