<?php
namespace Domain\hms\Model;
require_once __DIR__ . "/Person.php";

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity(repositoryClass="Domain\hms\Models\PatientRepo")
 */
class Patient extends Person {
    public function __construct() {
        $this->visits = new ArrayCollection();
    }
    
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    private $id;

    /**
     * @ORM\OneToMany(targetEntity="Visit", mappedBy="byPatient")
     */
    private $visits;

    /**
     * @ORM\Column(type="integer")
     */
    private $noOfVisits;

    /**
     * Get the value of noOfVisits
     */ 
    public function getNoOfVisits()
    {
        return $this->noOfVisits;
    }

    /**
     * Set the value of noOfVisits
     *
     * @return  self
     */ 
    public function setNoOfVisits($noOfVisits)
    {
        $this->noOfVisits = $noOfVisits;

        return $this;
    }

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
     * Get the value of visits
     */ 
    public function getVisits()
    {
        return $this->visits;
    }

    /**
     * Set the value of visits
     *
     * @return  self
     */ 
    public function setVisits($visits)
    {
        $this->visits = $visits;

        return $this;
    }
}